let data = [{
    button: {
        markup: '<wm-button class="btn-default" caption="Button" show="true" type="button" name="button1" iconclass="wm-sl-l sl-facebook" hint="facebook button" width="200px" height="80px" disabled="false" fontsize="18" color="#e64e4e" fontstyle="italic" textalign="center" backgroundcolor="#4d43d8" bordercolor="#f8f8f8" borderstyle="solid" borderwidth="2px" padding="5px 10px" margin="5px"></wm-button>',
        style: '.app-button{border-radius: 20px;} .app-button-text{text-transform: uppercase;} .app-button-icon{height: 10px;width: 20px;}'
    },
    label: {
        markup: '<wm-label padding="5px 10px unset 10px" name="label1" show="true" caption="Hello" hint="label hello" width="100px" height="15px" required="false" fontsize="18" color="#f60f0f" fontstyle="italic" textalign="center" bordercolor="#7062df" borderstyle="solid" borderwidth="2px" margin="5px 2px"></wm-label>',
        style: '.app-label{background-color: #000000;} .app-label-text{text-transform: lowercase;}'
    },
    anchor: {
        markup: '<wm-anchor margin="2px 4px 1px 4px" name="anchor1" show="true" caption="Facebook" hyperlink="www.facebook.com" hint="redirect to facebook" iconclass="wm-sl-l sl-facebook" width="100%" textalign="right" fontweight="bold" backgroundcolor="#1c84e9" bordercolor="#201c1c" borderstyle="solid" borderwidth="1px 2px 1px 1px" padding="5px"></wm-anchor>',
        style: '.app-anchor{height: 5%;} .app-anchor-text{color: #FFFFFF;text-decoration: underline;}'
    },
    icon: {
        markup: '<wm-icon name="icon1" show="true" caption="user" hint="user icon" iconsize="40px" iconposition="left" color="#b9d03e"></wm-icon>',
        style: '.app-icon{background-color: #E0E0E0;} .app-icon-text{font-size: 30px;} .app-icon-shape{font-weight: 500;}'
    },
    picture: {
        markup: '<wm-picture resizemode="cover" name="picture1" show="true" picturesource="resources/images/american-impressionism.png" shape="circle" width="200px" height="200px" backgroundcolor="#130202" bordercolor="#10e2a1" borderwidth="1px" padding="1px 3px 4px 2px" margin="1px 3px"></wm-picture>',
        style: '.app-picture{min-height: 100px;min-width: 100px;}'
    },
    text: {
        markup: '<wm-composite name="composite1"><wm-label class="col-xs-4 control-label" name="label1" width="20%" hint="text input label" backgroundcolor="#f03030" color="#ffffff" bordercolor="#131111" borderwidth="1px" padding="2px 4px 5px 3px" margin="1px 0px 3px 0px"></wm-label><wm-container class="col-xs-8" name="container1" width="80%" fontsize="20" fontweight="bold" backgroundcolor="#d28b8b"><wm-text name="text1" hint="text input" backgroundcolor="#c81818"></wm-text></wm-container></wm-composite>',
        style: '.app-text{height: 30%;width: 100%;} .app-text-focused: {color: #000000;border-color: #2EA71D;}'
    },
    radioset: {
        markup: '<wm-composite name="composite2" captionposition="left"><wm-label class="col-xs-4 control-label" name="label2" caption="Label 1" hint="radio set label"></wm-label><wm-container class="col-xs-8" name="container2"><wm-radioset height="auto" name="radioset1" datafield="All Fields"></wm-radioset></wm-container></wm-composite>',
        style: '.app-radioset{background-color: #2EA71D;} .app-radioset-text{color: #1D6CA7;} .app-radioset-group {color: #811DA7;} .app-radioset-group-title{color: #A71D9D;} .app-radioset-item{color: #A7831D;} .app-radioset-label{color: #90A71D;} .app-radioset-checked-icon .app-icon-text{color: #57DEDB;} .app-radioset-unchecked-icon .app-icon-text{color: #EDABAB;} .app-radioset-selected-label .app-icon-text{color: #C6C6C6;} .app-radioset-checked-icon .app-icon{height: 20px;width: 20px;} .app-radioset-unchecked-icon .app-icon{height: 20px;width: 20px;} .app-radioset-selected-label .app-icon{height: 20px;width: 20px;}'
    },
    textarea: {
        markup: '<wm-composite name="composite2"><wm-label class="col-xs-4 control-label" name="label2"></wm-label><wm-container class="col-xs-8" name="container2"><wm-textarea name="textarea1" maxchars="300" limitdisplaytext="bind:Widgets.textarea1.charlength + &quot;/&quot; + Widgets.textarea1.maxchars" backgroundcolor="#d64040" fontsize="22" fontstyle="italic"></wm-textarea></wm-container></wm-composite>',
        style: '.app-textare{width: 80%;} .app-textarea-focused{color: #000000;} .app-textarea-placeholder{color: #E70B0B;} .app-textarea-flotaing-label{color: #0BE7C9;} .app-textarea-active-flotaing-label{color: #330BE7;}'
    },
    checkbox: {
        markup: `<wm-content name="content1">
        <wm-page-content columnwidth="12" name="page_content1">
            <wm-composite name="composite3" captionposition="left">
                <wm-checkbox caption="Agree" name="checkbox1"></wm-checkbox>
            </wm-composite>
        </wm-page-content>`,
        style: `.app-checkbox{
            background-color: blue;
        }
        .app-checkbox-checkicon .app-icon-shape{
            color: red;
        }`
    },
    "form": {
        markup: `
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
        `,
    style: `.app-form{
            background-color: green;
        }
        .app-form-title{
            color: red
        }`
    },
    "formfield": {
        markup: `
        <wm-form-field readonly="false" name="value" displayname="Password" key="value" type="string" show="true" widget="password"></wm-form-field>`,
        style: `
        .app-form-field{
            background-color: green;
        }`
    }
}];

export default data;