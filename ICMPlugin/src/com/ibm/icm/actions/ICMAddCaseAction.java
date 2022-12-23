package com.ibm.icm.actions;

import com.ibm.ecm.extension.PluginAction;
import com.ibm.json.java.JSONObject;

import java.util.Locale;

public class ICMAddCaseAction extends PluginAction {

    @Override
    public String getId() {
        return "ICMAddCaseAction";
    }

    @Override
    public String getName(Locale locale) {
        return "ICM Add Case Action";
    }

    @Override
    public String getIcon() {
        return null;
    }

    @Override
    public String getPrivilege() {
        return "";
    }

    @Override
    public boolean isMultiDoc() {
        return false;
    }

    @Override
    public String getActionFunction() {
        return "performAction";
    }

    @Override
    public String getServerTypes() {
        return "p8";
    }

    @Override
    public boolean isGlobal() {
        return false;
    }

    @Override
    public String getActionModelClass() {
        return "icm.custom.action.AddCase";
    }

    @Override
    public JSONObject getAdditionalConfiguration(Locale locale) {
        String actionDefinition = "{\n" +
                "  \"ICM_ACTION_COMPATIBLE\" : true,\n" +
                "  \"context\" : null,\n" +
                "  \"name\" : \"Custom Add Case Action\",\n" +
                "  \"description\" : \"A custom add case action will be used for adding a custom case in a case page\",\n" +
                "  \"properties\" : [\n" +
                "    {\n" +
                "      \"id\": \"label\",\n" +
                "      \"title\" : \"Add Button Name\",\n" +
                "      \"defaultValue\" : \"Custom Add Case Action\",\n" +
                "      \"type\" : \"string\",\n" +
                "      \"isLocalized\" : false\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\" : \"solution\",\n" +
                "      \"type\" : \"string\",\n" +
                "      \"isLocalized\" : false,\n" +
                "      \"title\" : \"Solution Name\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\" : \"caseType\",\n" +
                "      \"title\" : \"Case Type\",\n" +
                "      \"isLocalized\" : false,\n" +
                "      \"type\" : \"string\"\n" +
                "    }\n" +
                "  ],\n" +
                "  \"events\" : [\n" +
                "    {\n" +
                "      \"id\" : \"icm.OpenAddCasePage\",\n" +
                "      \"title\" : \"Open Add Case page\",\n" +
                "      \"direction\" : \"published\",\n" +
                "      \"type\" : \"broadcast\",\n" +
                "      \"description\" : \"This action broadcast an event to create  a new add case page with mentioned details in configurations\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";
        JSONObject additionalActionConfigurations  = null;
        try {
           additionalActionConfigurations =  JSONObject.parse(actionDefinition);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return additionalActionConfigurations;
    }
}
