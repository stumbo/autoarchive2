
function syncFromPref(win) { // this need 0.5s for 8 rules
    //autoArchiveLog.info('syncFromPerf');
    // if not modal, user can open 2nd pref window, we will close the old one, and close/unLoadPerfWindow seems a sync call, so we are fine
    if ( this._win && this._win != win && !this._win.closed ) this._win.close();
    this._win = win;
    this._doc = win.document;
    let preference = Preferences.get('extensions.awsome_auto_archive.rules');
    let actualValue = preference.value !== undefined ? preference.value : preference.defaultValue;
    this.createRulesBasedOnString(actualValue, !win.arguments || !win.arguments[0]); // don't create empty rule if loadPerfWindow will create new rule based on selected email
    //autoArchiveLog.info('syncFromPerf done');
}

bindPerfed: false;
    function bindPref ()  {
    if ( this.bindPerfed ) return;
    this.bindPerfed = true;
    //Preferences.forceEnableInstantApply();
