/* automatically generated by JSCoverage - do not edit */
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    _$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (typeof _$jscoverage !== 'object') {
  _$jscoverage = {};
}
if (! _$jscoverage['application/pages/main/MainView.js']) {
  _$jscoverage['application/pages/main/MainView.js'] = [];
  _$jscoverage['application/pages/main/MainView.js'][1] = 0;
  _$jscoverage['application/pages/main/MainView.js'][7] = 0;
}
_$jscoverage['application/pages/main/MainView.js'].source = ["define<span class=\"k\">([</span>","    <span class=\"s\">'Titan'</span><span class=\"k\">,</span>","    <span class=\"s\">'template!./Main.html'</span><span class=\"k\">,</span>","    <span class=\"s\">'styles!./Main.less'</span>","<span class=\"k\">],</span> <span class=\"k\">function</span> <span class=\"k\">(</span>Titan<span class=\"k\">,</span> template<span class=\"k\">,</span> styles<span class=\"k\">)</span> <span class=\"k\">{</span>","","    <span class=\"k\">return</span> Titan<span class=\"k\">.</span>View<span class=\"k\">.</span>extend<span class=\"k\">(</span><span class=\"k\">{</span>","","        template<span class=\"k\">:</span> template<span class=\"k\">,</span>","","        styles<span class=\"k\">:</span> styles","","    <span class=\"k\">}</span><span class=\"k\">);</span>","","<span class=\"k\">}</span><span class=\"k\">);</span>"];
_$jscoverage['application/pages/main/MainView.js'][1]++;
define(["Titan", "template!./Main.html", "styles!./Main.less"], (function (Titan, template, styles) {
  _$jscoverage['application/pages/main/MainView.js'][7]++;
  return Titan.View.extend({template: template, styles: styles});
}));
