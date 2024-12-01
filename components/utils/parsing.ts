export const parseServerResponse = (response: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data.message, "text/html");
    
    // Extract the <wm-page> element
    const markupDOM = doc.querySelector("wm-page"); 
    const markup = markupDOM?.innerHTML;
    // Extract the <style> content
    const styles = doc.querySelector("style")?.textContent ?? ""

    console.log("styles are ==>", styles)

    return {
      markup,
      styles
    }

  }
