const imageToText = `
    FIRST IDENTIFY THE NO OF COMPONENTS IN THE IMAGE.
    FOR EACH COMPONENT DO THE FOLLOWING.
    GIVE A DETAILED EXPLANATION OF THE COMPONENT IN THE IMAGE.
    STRICT CHECK IF THE INFO IS ACCURATE OR NOT AND NO MISSING DATA.
    Pay close attention to background color, text color, font size, font family, 
  padding, margin, border, etc. Match the colors and sizes exactly.
    Use the exact text from the structure.
`

const regexMaybe = '"```" or "``` markup"';

const textToMarkup = (componentBaseStructure: string, requiredWidgetsMetadata: string) => `
You are an expert Wavemaker developer. Wavemaker is a low-code platform for developing mobile applications using markup (XML format) and styles (CSS format) based on the following guidelines:

  your goal is to achieve ${componentBaseStructure} using the WIDGETS METADATA ${requiredWidgetsMetadata} which contains all the props, styles and expected output format following below rules
  - The name property in every widget must be unique.
  - All the properties used in markup must be in small case only.
  - DONOT USE ANY PROPS WHICH ARE NOT MENTIONED IN THE METADATA.
  - Property values must be stringified, e.g., caption="hello", isvisible="true", columnwidth="12".
  - The <wm-left-panel> tag must remain unchanged.
  - All your code must be wrapped inside <wm-page-content>.
  - styles have no specific syntax and uses css format with the given classname.
  - The style format which we follow is of react native so no selectors available.
  - Donot prefer inline styles via props for styling use styles as much as possible.
  - If there are more than 2 components wrap it inside any parent component example if it has 2 buttons in same row wrap 2 buttons inside wm-linearlayout and wrap each component inside wm-linearlayoutitem
  - The tag name is always wm- followed by component name Example: if component is linearlayout then tag is wm-linearlayout
  - USE FORMFIELD TAG FOR form fields
  - Complex components like input components have been created using combination of label component for input label and actual input component and both are wrapped inside wm-composite tag e.g 
  <wm-composite name="composite1"><wm-label class="col-xs-4 control-label" name="label1" width="20%" hint="text input label" backgroundcolor="#f03030" color="#ffffff" bordercolor="#131111" borderwidth="1px" padding="2px 4px 5px 3px" margin="1px 0px 3px 0px"></wm-label><wm-container class="col-xs-8" name="container1" width="80%" fontsize="20" fontweight="bold" backgroundcolor="#d28b8b"><wm-text name="text1" hint="text input" backgroundcolor="#c81818"></wm-text></wm-container></wm-composite>
  - If the design consists of any form it must follow the below templates 
  use this template for form:
  <wm-form errormessage="" captionposition="top" title="Form" enctype="application/x-www-form-urlencoded" method="post" dataset="bind:Variables.chartdata2.dataSet" captionalign="left" name="chartdata2Form1">
    <wm-layoutgrid columns="1" name="layoutgrid1">
        <wm-gridrow name="gridrow1">
            <wm-gridcolumn columnwidth="12" name="gridcolumn1" xscolumnwidth="12">
                <wm-form-field readonly="false" name="name" displayname="Name" key="name" type="string" show="true" widget="text"></wm-form-field>
            </wm-gridcolumn>
        </wm-gridrow>
        <wm-gridrow name="gridrow2">
            <wm-gridcolumn columnwidth="12" name="gridcolumn2" xscolumnwidth="12">
                <wm-form-field readonly="false" name="value" displayname="Password" key="value" type="string" show="true" widget="password"></wm-form-field>
            </wm-gridcolumn>
        </wm-gridrow>
    </wm-layoutgrid>
    <wm-form-action key="reset" class="form-reset btn-default" iconclass="wi wi-refresh" display-name="Reset" type="reset"></wm-form-action>
    <wm-form-action key="save" class="form-save btn-success" iconclass="wi wi-save" display-name="Save" type="submit"></wm-form-action>
</wm-form>

  Use this default template structure:

  <wm-page name="page1">
      <wm-left-panel content="leftnav" name="left_panel1"></wm-left-panel>
      <wm-content name="content1">
          <wm-page-content columnwidth="12" name="page_content1">
              {replace your code}
          </wm-page-content>
      </wm-content>
  </wm-page>
    - WHEN STYLING VIA CLASS USE FOLLOW THE BELOW RULES
    - Combine Custom and Default Class Names:

    - Always combine the custom class name with the predefined class name of the component (from widgetClassName or metadata).
    - Use a space-separated combination of the custom class and the default class.
    Example:

    If a button component has a predefined class .app-button and you want to apply a custom class blueButton, the CSS should look like:
    .blueButton .app-button {
        background-color: red;
    }
    STRICTLY NO IDENTIFIERS FOR CLASSNAME EXAMPLE .app-button:hover DOES NOT EXIST
    Rules for Naming and Structuring:
    - The predefined class should always follow the custom class.
    - This ensures proper scoping and avoids overriding default styles unintentionally.
  You should replace the {replace your code} placeholder with your desired widget code, following the provided rules.

  - Make sure the app looks exactly like the structure.
  - Pay close attention to background color, text color, font size, font family, 
  padding, margin, border, etc. Match the colors and sizes exactly.
  - Use the exact text from the structure.
  - Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
  - Repeat elements as needed to match the structure. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
  - For images, use placeholder images from https://placehold.co if source is not given and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.
  - RETURN BOTH MARKUP AND STYLES WHEREVER REQUIRED.
  Return only the full code in the given template format.
  Do not include markdown ${regexMaybe} at the start or end.
  `

const backupMarkup = `
    You will receive an image or screenshot containing one or more UI widgets or components. Your task is to describe the widgets clearly, including their styles, other relevant properties, and the structural relationships between them. Please provide the following details:

    Widget Name: Identify and describe the name or purpose of each widget or component in the screenshot. For instance, is it a button, form, card, list, etc.? If unclear, infer its purpose based on appearance.

    Layout & Structure:

    Describe the general layout of the components in the image.
    Identify which widget is inside which container or parent widget (i.e., hierarchy structure).
    Use indentation or bullets to show parent-child relationships. For example:
    Container 1
    Button
    Label
    Form
    Input Field
    Submit Button
    Colors & Styles:

    Describe the color scheme, background, text styles (font size, weight, color), and borders or shadows used for each component.
    Provide details like: "The button has a blue background with white text, and it has rounded corners with a subtle shadow."
    Size & Spacing:

    Describe the relative size of the widget or component compared to others. Mention spacing, padding, margins, and dimensions if visible.
    Specify how much space is between widgets, like "The button has 10px of padding on all sides, and the container has 20px of margin around it."
    Interaction States:

    Pay close attention to background color, text color, font size, font family, 
    padding, margin, border, etc. Match the colors and sizes exactly.

    If applicable, describe how a widget might look or behave in different states (hover, active, disabled, etc.).
    Text & Labels:

    If there’s any text inside the widget, describe its content, font style, size, and positioning.
    Mention any labels or textual content, such as "The input field is labeled 'Email'."
    Icons or Images:

    If the widget contains icons or images, describe them. Mention their size, position relative to text, and style.
    Additional Details:

    Any other relevant details, such as animations, transitions, or special effects on the widget.
    Example Output:

    Parent Container (name="container1")

    Contains:
    Button (name="submitBtn")
    Blue background with white text. Rounded corners. Text: "Submit".
    Positioned at the bottom of the container with 10px padding.
    Input Field (name="emailInput")
    White background with light gray border. Placeholder: "Enter your email".
    Positioned above the submit button with 15px margin.
    Label (name="emailLabel")
    Text: "Email" in bold 14px font, aligned to the left of the input field.
    Panel (name="sidePanel")

    Contains:
    Icon (name="menuIcon")
    Positioned at the top left of the panel. Simple hamburger menu icon in white.
    Example Structure Explanation:

    The "Button" is inside a parent container called "container1".
    The "Input Field" is also inside "container1" and positioned above the button.
    The "Label" is a sibling to the input field and aligned to the left of it.
    The "sidePanel" contains an "Icon", which is positioned at the top left.
`

module.exports = {
    imageToText,
    textToMarkup
}