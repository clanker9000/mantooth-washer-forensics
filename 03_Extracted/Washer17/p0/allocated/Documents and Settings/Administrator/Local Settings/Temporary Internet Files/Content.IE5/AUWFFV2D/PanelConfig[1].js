ws.PanelConfig = [
	{
		enabled: Config.EnableAIMPanel,
		id: "AIM",
		label: Config.Strings.Panel_AIMLabel,
		description: Config.Strings.Panel_AIMDescription,
		type: "dojoWidget",
		widgetName: "ws:ImPanel",
		widgetRequires: ["ws.im.ImPanel"],
		widgetParams: {}
	},
	{
		enabled: true,
		id: "PEOPLE",
		label: Config.Strings.Panel_PeopleLabel,
		description: Config.Strings.Panel_PeopleDescription,
		type: "dojoWidget",
		widgetName: "ws:PeoplePanel",
		widgetRequires: [ "ws.address.PeoplePanel" ],
		widgetParams: {}
	},
	{
		enabled: true,
		id: "EVENT",
		label: Config.Strings.Panel_EventLabel,
		description: Config.Strings.Panel_EventDescription,
		type: "dojoWidget",
		widgetName: "ws:EventPanel",
		widgetRequires: [ "ws.panels.EventPanel" ],
		widgetParams: {}
		
	},
	{
		enabled: Config.EnableTMZPanel,
		id: "TMZ",
		label: "TMZ.com",
		description: "TMZ.com - Entertainment News",
		type: "dojoWidget",
		widgetName: "ws:FeedPanel",
		widgetRequires: [ "ws.panels.FeedPanel" ],
		widgetParams: { maxItems: 8, feedUrl: Config.BasePagesURL + "common/proxy.aspx/tmzFeed" }
	},
	{
		enabled: true,
		id: "TODO",
		label: Config.Strings.Panel_TodoLabel,
		description: Config.Strings.Panel_TodoDescription,
		type: "dojoWidget",
		widgetName: "ws:TaskPanel",
		widgetRequires: [ "ws.panels.TaskPanel" ],
		widgetParams: {}

	},
	{
		enabled: true,
		id: "MORE",
		label: Config.Strings.Panel_MoreLabel,
		description: Config.Strings.Panel_MoreDescription,
		type: "html",
		content: "<table width='100%' height='100%'><tr><td valign='top' align='center'><br><img src='" + Config.BaseResourcesURL + "images/comingsoon.gif'><br><br><div style='font: normal 12px Arial'>" + Config.Strings.Panel_MoreText1 + "  <a target='_blank' style='color: #0066cc; text-decoration: none;' href='" + Config.FeedbackLink + "'>" + Config.Strings.Panel_MoreText2 + "</a> " + Config.Strings.Panel_MoreText3 + "</div></td></tr></table>"
	}
	
];

