package com.ibm.icm;
import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.icm.actions.ICMAddCaseAction;

import java.util.Locale;

public class ICMCustomPlugin  extends Plugin {

    @Override
    public String getId() {
        return "ICMAZPlugin";
    }

    @Override
    public String getName(Locale locale) {
        return "ICM Allianz Plugin";
    }

    @Override
    public String getVersion() {
        return "1.0";
    }

    @Override
    public PluginAction[] getActions() {
        return new PluginAction[] {
                new ICMAddCaseAction()
        };
    }

    @Override
    public String getScript() {
        return "ICMAZPlugin.js";
    }

    @Override
    public String getDojoModule() {
        return null;
    }
}
