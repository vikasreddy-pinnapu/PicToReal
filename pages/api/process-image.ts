import OpenAI from 'openai';
import dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as formidable from 'formidable';
import fs from 'fs';

import widgetsMetadata from './utils/metadata';
import widgetsExample from './utils/examples';
import {  imageToText, textToMarkup  } from './utils/prompts';
import {  availableWidgets, languages, languages_i18n, regexMaybe  } from './utils/constants'
import { parseForm } from './utils/parsing';

dotenv.config()

export const config = {
  api: {
    bodyParser: false,
  },
};


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

const getComponentDescription = async (image: string): Promise<string | null>  => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: `${imageToText}` },
                        { type: 'image_url',
                            image_url: {
                            "url": `${image}`,
                        },
   }
                    ]
                }
            ]
        })
        console.log("First model output:", response.choices[0].message.content);
        // return response.data.message.content;
        return response.choices[0].message.content;    
    }
    catch(error) {
        console.log("Error with First Model", error);
    }
    return null
}


const validateDescription = async (description: string, image: string): Promise<{valid: boolean, feedback: string}> => {
  const criticPrompt = `
  You are a critic reviewing AI-generated outputs. Given the following description and image, determine if the description accurately represents the content in the image. 

  Description: 
  "${description}"

  Image: 
  [Image provided separately]

  Respond with "Valid" if the description is accurate, or provide specific feedback for improvement if it is not.
  `;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: criticPrompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${image}`,
              },
            },
          ],
        },
      ],
    });
    const modelResponse = response.choices[0].message.content;
    console.log("Critic feedback:", modelResponse);

    if (modelResponse.includes("Valid")) {
      return { valid: true, feedback: null };
    } else {
      return { valid: false, feedback: modelResponse };
    }
  } catch (error) {
    console.error("Error with the critic model:", error);
    return { valid: false, feedback: "Critic model failed to respond." };
  }
};



const getRequiredWidgetsData = async (description: string) =>{
    const basicWidgets = {
      LinearLayout: widgetsMetadata[0].widgets.Linearlayout,
      Gridlayout: widgetsMetadata[0].widgets.Gridlayout,
      Form: widgetsMetadata[0].widgets.Form
    }
    const basicStyles = {
      View: widgetsMetadata[0].styles.View,
      Text: widgetsMetadata[0].styles.Text,
      Image: widgetsMetadata[0].styles.Image
    }
  
    const availableWidgets = [...Object.keys(widgetsMetadata[0].widgets), "Container", "Anchor", "Button", "Label", "Icon", "Picture", "Text", "Radioset", "Textarea"];
    const regex = '```json'
  
    const widgetsPrompt = `
    You are an expert Wavemaker developer. Wavemaker is a low-code platform for developing mobile applications using markup (XML format) and styles (CSS format) based on the following guidelines:
  
    - The fundamental building blocks are the layout widgets, which include ${basicWidgets}.
    - Styles are grouped into three categories based on their usage: ${basicStyles}.
    - From the list of widgets ${availableWidgets}, identify all widgets required to construct the given description below 
    ${description}
    
    - Make sure to return the output only in the form of array, e.g: ["Linearlayout", "Button"]
    - Make sure to not add any ${regex} or \n
    `
      try {
          const response = await axios.post("http://127.0.0.1:11434/api/generate", {
            model: "qwen2.5-coder",
            prompt: widgetsPrompt,
            stream: false,
          });
      
          console.log("Second model output:", response.data.response);
          return response.data.response;
        } catch (error) {
          console.error("Error with the second model:", error);
        }
  }
  

  const getMarkupAndStyles = async (componentBaseStructure: string, requiredWidgets?: any) => {
    if(requiredWidgets){
    const requiredWidgetsMetadata = [];
    requiredWidgets
      .replace(/wm-/g, "")
      .replace(/[\[\]\"\'\s]/g, "")
      .split(",")
      .forEach((element) => {
        const widgetData = {
          widgetName: element,
          widgetprops: widgetsMetadata[0].props[element],
          widgetClassName: widgetsMetadata[0].styles[element],
          expectedOutputFormat: widgetsExample[0][element],
        };
        requiredWidgetsMetadata.push(widgetData);
      });
    console.log(requiredWidgetsMetadata)
    const prompt = textToMarkup(componentBaseStructure, requiredWidgetsMetadata);
    try {
      const response = await axios.post("http://127.0.0.1:11434/api/generate", {
        model: "qwen2.5-coder",
        prompt: prompt,
        stream: false,
      });
  
      console.log("final model output:", response.data.response);
      return response.data.response;
    } catch (error) {
      console.error("Error with the second model:", error);
    }
    }
  };;

  const multiLanguageValidator = async (description: string, image: string, ) => {
    const i18nPrompt = `
    You are a localization expert. Generate a JSON object containing translations for all languages provided. Extract the TEXT content from the provided Image. Return as a JSON object where each language has key-value pairs for the extracted elements.
    Return only the full code in the JSON format.
    Do not include markdown ${regexMaybe} JSON" at the start or end.
  
    Languages: 
    "${languages.join(", ")}"
    `;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `${i18nPrompt}` },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${image}`,
                },
              },
            ],
          },
        ],
      });
      console.log(response.choices[0].message.content.trim(), "example");
      const translations = JSON.parse(response.choices[0].message.content.trim());
      console.log(translations, "translated");
      Object.entries(translations).forEach(
        ([language, translationsForLanguage]) => {
          const languageCode = languages_i18n[language];
          const fileName = `${languageCode}.json`;
  
          let fileData = {};
          if (fs.existsSync(fileName)) {
            fileData = JSON.parse(fs.readFileSync(fileName, "utf-8"));
          }
  
          Object.entries(translationsForLanguage).forEach(([key, value]) => {
            if (!fileData[key]) {
              fileData[key] = value || "";
            }
          });
  
          fs.writeFileSync(fileName, JSON.stringify(fileData, null, 2));
        }
      );
    } catch (error) {
      console.error("Error validating multi-language JSON files:", error);
    }
  };

  const getFeedback = async (requirement: string, output?: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:11434/api/generate", {
        model: "qwen2.5-coder",
        prompt: `
        Rate the following output based on the given requirements:
  
        Requirement:
        ${requirement}
  
        Output:
        ${output}
  
        Evaluation Rules:
  
        Widget Naming:
  
        Ensure the name property in every widget is unique.
        Property Format:
  
        All properties in markup must be in lowercase.
        Property values must be stringified, e.g., caption="hello", isvisible="true", columnwidth="12".
        Tag Constraints:
  
        The <wm-left-panel> tag must remain unchanged.
        All code must be wrapped inside the <wm-page-content> tag.
        Styling Rules:
  
        Follow React Native CSS format; selectors are not allowed.
        Avoid inline styles; use external styles with class names whenever possible.
        Custom and default class names must be combined using a space-separated format.
        Example:
        If a button has the predefined class .app-button and the custom class blueButton, combine them like this:
        
        .blueButton .app-button {
            background-color: red;
        }
        Avoid identifiers or pseudo-selectors (e.g., .app-button:hover is not allowed).
        The predefined class name must always follow the custom class name to maintain proper scoping.
        Accessibility:
  
        Include accessibilitylabel and accessibilityhint for widgets where mandatory.
        Widget Restrictions:
  
        Use only the widgets provided in ${availableWidgets}. Avoid adding anything else.
        Scoring:
  
        Rate on a scale of 1 to 10.
        If the score is less than 7, provide a clear explanation of how the output can be improved.
        `,
        stream: false,
      });
  
      const feedback = response.data.response;
      console.log("Feedback:", feedback);
  
      const ratingMatch = feedback.match(/Rating:\s*(\d+)/);
      const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 0;
  
      console.log("achieving rating is ===>", rating)

      if (rating >= 7) {
        console.log("Feedback score is good. Output accepted.");
        return { score: rating, output };
      } else {
        console.log("Feedback score is low. Repeating step 2 with feedback.");
  
        return { score: rating, feedback };
      }
    } catch (error) {
      console.error("Error with feedback:", error);
    }
  };
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { fields } = await parseForm(req);            
  const encodedImage = fields?.image[0] as string;

  if(!encodedImage) {
    res.status(400).json({ message: "unable to send the data to encodedImage" })
    return
  }


  let componentBaseStructure = null;
  let validationResult = { valid: false, feedback: "" };
  let maxRetries = 3;
  let retryCount = 0;


  for (const language of languages) {
    const i18nCode = languages_i18n[language];
    const fileName = `${i18nCode}.json`;

    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify({ message: "" }, null, 2));
    }
  }

  while(!validationResult.valid && retryCount < maxRetries) {

    retryCount++;

    if(retryCount === 1) {
      componentBaseStructure = await getComponentDescription(encodedImage);
    } else {
      console.error("Failed to extract description. Retrying...");
    }
    
    if (!componentBaseStructure) {
      console.error("Failed to extract description. Retrying...");
      continue;
    }

    validationResult = await validateDescription(componentBaseStructure, encodedImage);

    if(!validationResult.valid) {
      console.log(
        "Critic feedback indicates the description is inaccurate. Retrying step 1 with feedback:",
        validationResult.feedback
      );

      if (
        validationResult.feedback.includes("minor issues") ||
        retryCount >= maxRetries
      ) {
        console.log(
          "Ending retries due to " + `${retryCount == 5}`
            ? "max retries reached"
            : "trivial feedback."
        );
        validationResult.valid = true;
        break;
      }
      componentBaseStructure = `${componentBaseStructure}. Feedback: ${validationResult.feedback}`;
    }
  }
  
  if (!validationResult.valid) {
    console.error("Unable to satisfy the critic within retry limit.");
    return;
  }

  console.log("Validated description:", componentBaseStructure);

  // if (validationResult.valid) {
  //   multiLanguageValidator(componentBaseStructure as string, encodedImage);
  // }

  if (componentBaseStructure) {
    let requiredWidgets = await getRequiredWidgetsData(componentBaseStructure);
    console.log(requiredWidgets, "req")
    let finalMarkup = await getMarkupAndStyles(
      componentBaseStructure,
      requiredWidgets
    );
    console.log("final Markup ==", finalMarkup);
    let feedbackResult = await getFeedback(
      "Create a web component based on the description",
      finalMarkup
    );

    console.log("feedbackResult is ==>", feedbackResult)

    // console.log("========= feedbackResult.score========== \n", feedbackResult.score, '\n============');

    while (feedbackResult.score < 6) {
      // console.log("========= feedbackResult.score========== inside ====\n", feedbackResult.score, '\n============');
      // console.log("Using feedback for improvement:", feedbackResult.feedback);
      finalMarkup = await getMarkupAndStyles(
        `${componentBaseStructure} Based on the feedback: ${feedbackResult.feedback}`
      );
      feedbackResult = await getFeedback(
        "Create a web component based on the description",
        finalMarkup
      );
    }

    // console.log("Final Outputttttt:", feedbackResult.output);

    if(!feedbackResult) {
      res.status(500).json({ message: " Internal Server Error! " })
      return;
    }

    console.log("<== The feedback result sent to FE is ==>", feedbackResult.output)

    res.status(200).json({  message: feedbackResult.output })
  }


}

// SUNIL: The below is the initial verison of the code

// if(req.method === 'POST') {
    //     try {
    //         if(componentBaseStructure) {
    //             let requiredWidgets = await getRequiredWidgetsData(componentBaseStructure);
    //             let finalMarkup = await getMarkupAndStyles(componentBaseStructure, requiredWidgets);
    //             if(!finalMarkup) {
    //               return res.status(400).json({ error: "Image files are require" })
    //           }
    //           res.status(200).json({ message: finalMarkup })  
    //         }

    //     }
    //     catch(error) {
    //       console.log("Error is cached and it is ==>", error)
    //     }
    // }
