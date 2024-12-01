const data = [
    {
        "widgets": {
            "linearlayout": {
                "description": "A container widget that organizes its children using the flex-box model, exclusively accepting wm-linearlayoutitem as children.",
                "properties": {
                    "direction": "Defines the arrangement of children (horizontal or vertical).",
                    "spacing": "Specifies space between children. Inherits from parent if not set.",
                    "alignment": {
                        "horizontal": "Aligns children horizontally within the layout.",
                        "vertical": "Aligns children vertically within the layout."
                    }
                },
                "spaceAllocation": {
                    "initial": "Allocates sufficient space for each child based on its size.",
                    "remaining": "Distributes extra space based on the flex-grow property of children."
                },
                "example": {
                    "scenario": "Using the Grid Layout in a 12-column system:",
                    "sample-code": `<wm-linearlayout direction="row" spacing="4" padding="4px" name="linearlayout1"> <wm-linearlayoutitem flexgrow="1" name="linearlayoutitem2"> <wm-label padding="unset" name="label1" class="h1"></wm-label> </wm-linearlayoutitem> <wm-linearlayoutitem name="linearlayoutitem4" flexgrow="1"> <wm-label padding="unset" class="h1" name="label2"></wm-label> </wm-linearlayoutitem> </wm-linearlayout>`
                }
            },
            "layoutgrid": {
                "description": "A versatile layout widget for dividing page content into grids or cells, offering flexibility in widget placement and responsive rendering.",
                "properties": {
                    "columns": "Defines the number of columns in the grid. The setting is propagated to all rows.",
                    "height": "Specifies the overall height of the grid.",
                    "width": "Specifies the overall width of the grid.",
                    "rows": {
                        "add": "Insert new rows into the grid. The new row replicates the last row's column pattern.",
                        "move": "Reposition rows anywhere within the grid."
                    },
                    "columnsMove": "Allows repositioning of columns anywhere within the grid."
                },
                "advantages": [
                    "Flexibility in widget placement without complex design considerations.",
                    "Responsive rendering on devices like mobile, tablet, etc.",
                    "Based on the Bootstrap Grid system for a standardized 12-column layout."
                ],
                "example": {
                    "scenario": "Using the Grid Layout in a 12-column system:",
                    "sample-code": `<wm-layoutgrid name="layoutgrid2">
                <wm-gridrow name="gridrow3">
                    <wm-gridcolumn columnwidth="6" name="gridcolumn3">
                        <wm-label padding="unset" name="label3" class="h1"></wm-label>
                    </wm-gridcolumn>
                    <wm-gridcolumn columnwidth="6" name="gridcolumn4">
                        <wm-label padding="unset" class="h1" name="label4"></wm-label>
                    </wm-gridcolumn>
                </wm-gridrow>
                <wm-gridrow name="gridrow4">
                    <wm-gridcolumn columnwidth="6" name="gridcolumn5">
                        <wm-label padding="unset" class="h1" name="label6"></wm-label>
                    </wm-gridcolumn>
                    <wm-gridcolumn columnwidth="6" name="gridcolumn6">
                        <wm-label padding="unset" class="h1" name="label5"></wm-label>
                    </wm-gridcolumn>
                </wm-gridrow>
            </wm-layoutgrid>`
                }
            },
            "form": {
                "description": "A flexible form widget for collecting and submitting user input, supporting validation and customizable layouts.",
                "properties": {
                    "errormessage": "Defines the error message to display for form validation errors.",
                    "captionposition": "Sets the position of the form field captions (e.g., 'top', 'left').",
                    "title": "The title of the form, displayed at the top.",
                    "enctype": "Specifies the encoding type for form data submission (e.g., 'application/x-www-form-urlencoded').",
                    "method": "Specifies the HTTP method for form submission (e.g., 'post', 'get').",
                    "dataset": "Binds the form to a data source or variable.",
                    "captionalign": "Specifies the alignment of the captions ('left', 'right', 'center').",
                    "name": "The unique identifier for the form."
                },
                "advantages": [
                    "Supports binding to datasets for seamless data handling.",
                    "Customizable layout using nested grid systems.",
                    "Built-in validation with error message support.",
                    "Responsive design for various screen sizes."
                ],
                "example": {
                    "scenario": "Creating a user input form with validation and actions:",
                    "sample-code": `
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
                    `
                }
            }
        },
        "props": {
            "label": {
                "caption": "Text displayed on the label",
                "wrap": "Indicates if text should wrap",
                "nooflines": "Number of lines for text display",
                "accessibilitylabel": "Screen reader label for accessibility",
                "hint": "Additional hint for the label",
                "accessibilityrole": "Role of the label for accessibility",
            },
            "button": {
                "caption": "Text displayed on the button",
                "badgevalue": "Value displayed as a badge",
                "iconclass": "name of the icon Example: wi wi-save",
                "iconposition": "Position of the icon (left, right, etc.)",
                "iconsize": "Size of the icon",
                "iconurl": "URL for the icon",
                "iconheight": "Height of the icon",
                "iconwidth": "Width of the icon",
                "iconmargin": "Margin around the icon",
                "accessibilitylabel": "Screen reader label for the button",
            },
            "anchor": {
                "caption": "Text displayed as the anchor",
                "hyperlink": "URL for the anchor",
                "width": "Width of the anchor",
                "height": "Height of the anchor",
                "iconclass": "name of the icon Example: wi wi-save",
                "iconposition": "Position of the icon (left, right, etc.)",
                "target": "Target behavior of the link (e.g., '_blank')",
                "iconurl": "URL for the icon",
                "iconheight": "Height of the icon",
                "iconwidth": "Width of the icon",
                "iconmargin": "Margin around the icon",
                "accessibilitylabel": "Screen reader label for the anchor",
                "hint": "Additional hint for the anchor",
                "accessibilityrole": "Role of the anchor for accessibility",
                "nooflines": "Number of lines for text display",
            },
            "icon": {
                "iconclass": "name of the icon Example: wi wi-save",
                "iconposition": "Position of the icon (left, right, etc.)",
                "caption": "Text displayed with the icon",
                "iconsize": "Size of the icon",
                "onTap": "Function triggered on tap",
                "iconurl": "URL for the icon",
                "iconheight": "Height of the icon",
                "iconwidth": "Width of the icon",
                "iconmargin": "Margin around the icon",
                "accessibilitylabel": "Screen reader label for the icon",
                "hint": "Additional hint for the icon",
                "accessibilityrole": "Role of the icon for accessibility",
            },
            "picture": {
                "picturesource": "Source URL of the picture",
                "pictureplaceholder": "Placeholder for the picture",
                "shape": "Shape of the picture (e.g., circle, square)",
                "resizemode": "Resize mode for the picture",
                "accessibilitylabel": "Screen reader label for the picture",
                "hint": "Additional hint for the picture",
                "accessibilityrole": "Role of the picture for accessibility",
            },
            "text": {
                "autocomplete": "Specifies if autocomplete is enabled",
                "datavalue": "Current value of the text field",
                "maxchars": "Maximum allowed characters",
                "readonly": "Indicates if the field is read-only",
                "type": "Type of input (e.g., text, password)",
                "updateon": "Trigger for value updates",
                "required": "Specifies if the field is mandatory",
                "accessibilitylabel": "Screen reader label for the text field",
                "hint": "Additional hint for the text field",
                "accessibilityrole": "Role of the text field for accessibility",
                "accessibilitylabelledby": "ID of the element labeling the field",
                "maskchar": "Character used for masking input",
            },
            "textarea": {
                "autocomplete": "Specifies if autocomplete is enabled",
                "datavalue": "Current value of the textarea",
                "maxchars": "Maximum allowed characters",
                "readonly": "Indicates if the field is read-only",
                "type": "Type of input (e.g., text, password)",
                "updateon": "Trigger for value updates",
                "required": "Specifies if the field is mandatory",
                "accessibilitylabel": "Screen reader label for the textarea",
                "hint": "Additional hint for the textarea",
                "accessibilityrole": "Role of the textarea for accessibility",
                "accessibilitylabelledby": "ID of the element labeling the field",
                "maskchar": "Character used for masking input",
            },
            "radioset": {
                "dataset": "Data source for the radio set",
                "datavalue": "Selected value from the radio set",
                "displayfield": "Field to display as label",
                "datafield": "Field for the value",
                "orderby": "Order of the options",
                "readonly": "Indicates if the set is read-only",
                "displaylabel": "Label for the set",
                "displayValue": "Value displayed for selection",
                "iconclass": "name of the icon Example: wi wi-save",
                "accessibilitylabel": "Screen reader label for the radio set",
                "hint": "Additional hint for the radio set",
                "accessibilityrole": "Role of the radio set for accessibility",
                "accessibilitylabelledby": "ID of the element labeling the set",
            },
            "checkbox": {
                "dataset": "Data source for the checkbox set",
                "datavalue": "Selected values from the checkboxes",
                "displayfield": "Field to display as label",
                "datafield": "Field for the value",
                "orderby": "Order of the options",
                "readonly": "Indicates if the checkboxes are read-only",
                "displaylabel": "Label for the checkbox",
                "displayValue": "Value displayed for selection",
                "iconclass": "name of the icon Example: wi wi-save",
                "accessibilitylabel": "Screen reader label for the checkbox set",
                "hint": "Additional hint for the checkbox set",
                "accessibilityrole": "Role of the checkbox set for accessibility",
                "accessibilitylabelledby": "ID of the element labeling the set",
            },
            "form": {
                "title": "Title of the form",
                "subheading": "Subtitle or description of the form",
                "iconclass": "name of the icon Example: wi wi-save",
                "postmessage": "Message displayed after submission",
                "errormessage": "Message displayed on error",
                "messagelayout": "Layout style for messages",
            },
            "formfield": {
                "placeholder": "Placeholder text for the field",
                "defaultvalue": "Default value of the field",
                "datavalue": "Current value of the field",
                "validationmessage": "Message for validation errors",
                "required": "Indicates if the field is mandatory",
                "widget": "Type of widget (e.g., text, password, checkbox)",
                "dataset": "Data source for the field",
                "displayfield": "Field to display as label",
                "datafield": "Field for the value",
                "isDataSetBound": "Indicates if the field is bound to a dataset",
                "readonly": "Indicates if the field is read-only",
            }
        },
        "styles": {
            "View": {
                "align-content": "flex-start, flex-end, center, stretch, space-between, space-around",
                "align-items": "flex-start, flex-end, center, stretch, baseline",
                "align-self": "auto, flex-start, flex-end, center, stretch, baseline",
                "backface-visibility": "visible, hidden",
                "background-color": "color",
                "background-image": "path of image in the resources folder",
                "background-position": "center or top left positions in px or %",
                "background-repeat": "no-repeat, repeat-x, repeat-y, repeat",
                "background-size": "cover, contain, or width height in px or %",
                "border-bottom-width": "number of pixels",
                "border-left-width": "number of pixels",
                "border-right-width": "number of pixels",
                "border-top-width": "number of pixels",
                "border-color": "color",
                "border-top-color": "color",
                "border-right-color": "color",
                "border-bottom-color": "color",
                "border-left-color": "color",
                "border-radius": "number of pixels",
                "border-style": "'solid', 'dotted', 'dashed'",
                "border-width": "number of pixels",
                "border": "short hand property to specify border (width, style and color)",
                "box-shadow": "to specify the box shadow",
                "bottom": "number of pixels",
                "display": "flex, none",
                "flex": "number",
                "flex-basis": "number or string",
                "flex-direction": "row, row-reverse, column, column-reverse",
                "flex-grow": "number",
                "flex-shrink": "number",
                "flex-wrap": "wrap, nowrap, wrap-reverse",
                "height": "number or in %",
                "justify-content": "flex-start, flex-end, center, space-between, space-around, space-evenly",
                "left": "number of pixels",
                "margin": "short hand property to specify margin in all directions",
                "margin-bottom": "number of pixels",
                "margin-left": "number of pixels",
                "margin-right": "number of pixels",
                "margin-top": "number of pixels",
                "max-height": "number of pixels or in %",
                "min-height": "number of pixels or in %",
                "max-width": "number of pixels or in %",
                "min-width": "number of pixels or in %",
                "opacity": "number between 0 and 1",
                "overflow": "visible, hidden, scroll",
                "padding": "short hand property to specify padding in all directions",
                "padding-bottom": "number of pixels",
                "padding-left": "number of pixels",
                "padding-right": "number of pixels",
                "padding-top": "number of pixels",
                "position": "absolute, relative",
                "right": "number of pixels",
                "top": "number of pixels",
                "width": "number of pixels or in %",
                "z-index": "number"
            },
            "Text": {
                "color": "color",
                "font-family": "font family name",
                "font-size": "number in pixels",
                "font-variant": "small-caps, oldstyle-nums, lining-nums, tabular-nums, proportional-nums",
                "font-weight": "normal, bold, 100, 200, 300, 400, 500, 600, 700, 800, 900",
                "letter-spacing": "number in pixels",
                "line-height": "number in pixels",
                "text-align": "auto, left, right, center, justify",
                "text-decoration-line": "none, underline, line-through",
                "text-decoration-color": "color",
                "text-decoration-style": "solid, double, dotted, dashed",
                "text-shadow": "h-shadow v-shadow blur-radius color",
                "text-transform": "none, uppercase, lowercase, capitalize"
            },
            "Image": {
                "height": "number or in %",
                "max-height": "number of pixels or in %",
                "width": "number of pixels or in %",
                "max-width": "number of pixels or in %",
                "border-radius": "number of pixels"
            },
            "icon": {
            ".app-icon": {
                "purpose": "To style the outermost wrapper element of icon widget.",
                "styleType": "View"
            },
            ".app-icon-text": {
                "purpose": "To style the caption text of icon widget.",
                "styleType": "Text"
            },
            ".app-icon-shape": {
                "purpose": "To style the icon of icon widget.",
                "styleType": "Text"
            }
        },
        "anchor": {
            ".app-anchor": {
                "purpose": "To style the outermost wrapper element of anchor widget.",
                "styleType": "View"
            },
            ".app-anchor-text": {
                "purpose": "To style the caption text of anchor widget.",
                "styleType": "Text"
            },
            ".app-anchor-badge": {
                "purpose": "To style the badge of anchor widget.",
                "styleType": "Text"
            },
            ".app-anchor-icon": {
                "purpose": "To style the icon of anchor widget.",
                "styleType": "WM Icon"
            }
        },
        "button": {
            ".app-button": {
                "purpose": "To style the outermost wrapper element of button widget.",
                "styleType": "View"
            },
            ".app-button-text": {
                "purpose": "To style the caption text of button widget.",
                "styleType": "Text"
            },
            ".app-button-content": {
                "purpose": "To style the content wrapper element of button widget.",
                "styleType": "View"
            },
            ".app-button-badge": {
                "purpose": "To style the badge of button widget.",
                "styleType": "Text"
            },
            ".app-button-icon": {
                "purpose": "To style the icon of button widget.",
                "styleType": "WM Icon"
            }
        },
        "label": {
            ".app-label": {
                "purpose": "To style the outermost wrapper element of label widget.",
                "styleType": "View"
            },
            ".app-label-text": {
                "purpose": "To style the caption text of label widget.",
                "styleType": "Text"
            },
            ".app-label-asterisk": {
                "purpose": "To style the asterisk symbol of label widget.",
                "styleType": "Text"
            },
            ".app-label-link": {
                "purpose": "	To style links with in the label widget.",
                "styleType": "Text"
            }
        },
        "picture": {
            "app-picture": {
                "purpose": "To style the outermost wrapper element of picture widget.",
                "styleType": "Image"
            }
        },
        "radioset": {
            ".app-radioset": {
                "purpose": "To style the outermost wrapper element of radioset widget.",
                "styleType": "View"
            },
            ".app-radioset-text": {
                "purpose": "To style the text of radioset widget",
                "styleType": "Text"
            },
            ".app-radioset-group": {
                "purpose": "To style the group container.",
                "styleType": "Text"
            },
            ".app-radioset-group-title": {
                "purpose": "To style the group header title of radioset widget.",
                "styleType": "Text"
            },
            ".app-radioset-item": {
                "purpose": "	To style the item wrapper element of radioset widget.",
                "styleType": "View"
            },
            ".app-radioset-label": {
                "purpose": "To style the label of radioset widget.",
                "styleType": "Text"
            },
            ".app-radioset-checked-icon": {
                "purpose": "To style the checked state of radioset widget.",
                "styleType": "WM Icon"
            },
            ".app-radioset-unchecked-icon": {
                "purpose": "To style the unchecked state of radioset widget.",
                "styleType": "WM Icon"
            },
            ".app-radioset-selected-label": {
                "purpose": "To style the selected text state of radioset widget.",
                "styleType": "WM Icon"
            }
        },
        "checkbox": {
            ".app-checkbox": {
                "purpose": "To style the outermost wrapper element of checkbox widget.",
                "styleType": "View"
            },
            ".app-checkbox-color": {
                "purpose": "To specify the color of checkbox widget.",
                "styleType": "Text"
            },
            ".app-checkbox-label": {
                "purpose": "To style the label of checkbox widget.",
                "styleType": "Text"
            },
            ".app-checkbox-checkicon": {
                "purpose": "To style the checked icon of checkbox widget.",
                "styleType": "WM Icon"
            },
            ".app-checkbox-uncheckicon": {
                "purpose": "To style the unchecked icon of checkbox widget.",
                "styleType": "WM Icon"
            },
        },
        "text": {
            ".app-text": {
                "purpose": "To style the outermost wrapper element of text widget",
                "styleType": "View"
            },
            ".app-text-invalid": {
                "purpose": "To style the invalid state of text widget.",
                "styleType": "Text"
            },
            ".app-text-focused": {
                "purpose": "To style the focused state of text widget.",
                "styleType": "Text"
            },
            ".app-text-floating-label": {
                "purpose": "To style the floating-label in text widget.",
                "styleType": "Text"
            },
            ".app-text-active-floating-label": {
                "purpose": "To style the floating-label when it is floating at top of text widget.",
                "styleType": "Text"
            }
        },
        "textarea": {
            ".app-textarea": {
                "purpose": "To style the outermost wrapper element of textarea widget.",
                "styleType": "Text"
            },
            ".app-textarea-invalid": {
                "purpose": "To style the invalid state of textarea widget.",
                "styleType": "Text"
            },
            ".app-textarea-focused": {
                "purpose": "To style the focused state of textarea widget.",
                "styleType": "Text"
            },
            ".app-textarea-placeholder": {
                "purpose": "To style the placeholder text of textarea widget.",
                "styleType": "Text"
            },
            ".app-textarea-floating-label": {
                "purpose": "To style the floating-label in text area widget.",
                "styleType": "Text"
            },
            ".app-textarea-active-floating-label": {
                "purpose": "To style the floating-label when it is floating at top of text area widget.",
                "styleType": "Text"
            }
        },
        "linearlayout": {
            ".app-linearlayout": {
                "purpose": "To style the outermost wrapper element of linear-layout widget.",
                "styleType": "View"
            },
            ".app-linearlayoutitem": {
                "purpose": "To style the outermost wrapper element of linear layout item.",
                "styleType": "View"
            }
        },
        "layoutgrid": {
            ".app-layoutgrid": {
                "purpose": "To style the outermost wrapper element of grid-layout widget.",
                "styleType": "View"
            }
        },
        "container": {
            ".app-container": {
                "purpose": "To style the outermost wrapper element of container widget.",
                "styleType": "View"
            },
            ".app-container-content": {
                "purpose": "	To style the content of container widget.",
                "styleType": "View"
            }
        },
        "form": {
            ".app-form": {
                "purpose": "To style the outermost wrapper element of form widget.",
                "styleType": "View"
            },
            ".app-form-header": {
                "purpose": "To style the header of form widget.",
                "styleType": "Text"
            },
            ".app-form-title": {
                "purpose": "To style the title of form widget.",
                "styleType": "Text"
            },
            ".app-form-sub-title": {
                "purpose": "To style the subtitle of form widget.",
                "styleType": "Text"
            }
        },
        "formfield": {
            ".app-form-field": {
                "purpose": "To style the outermost wrapper element of form-field.",
                "styleType": "View"
            }
        }
    }
    }
];

export default data;