function initiate() {

    // Enable behavior to open side panel on action click
     chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
         .catch((error) => console.error('SidePanel error:', error));
   
     // Set dynamic rules for modifying headers when the extension is installed
     chrome.runtime.onInstalled.addListener(() => {

        chrome.contextMenus.create({
            id: 'openSidePanel',
            title: 'Open Trial ChatGPT Sidebar',
            contexts: ['all']
          });

          chrome.contextMenus.onClicked.addListener((info, tab) => {
            if (info.menuItemId === 'openSidePanel') {
              // This will open the panel in all the pages on the current window.
              chrome.sidePanel.open({ windowId: tab.windowId });
            }
          });
   
       // // Making sure the chatgpt website is already visited so no unusual activities will not be encouraged
       chrome.tabs.create({ url: "https://chatgpt.com", active: false }, function(tab) {
         });
   
          


         chrome.declarativeNetRequest.updateDynamicRules({
             removeRuleIds: [1],  // Remove any existing rules with ID 1
             addRules: [{
                 id: 1,
                 priority: 1,
                 action: {
                     type: "modifyHeaders",
                     responseHeaders: [
                         {
                             header: "Content-Security-Policy",
                             operation: "remove"
                         },
                         {
                             header: "X-Frame-Options",
                             operation: "remove"
                         },
                         {
                             header: "Frame-Options",
                             operation: "remove"
                         },
                         {
                             header: "Frame-Ancestors",
                             operation: "remove"
                         },
                         {
                             header: "X-Content-Type-Options",
                             operation: "remove"
                         },
                         {
                             header: "Access-Control-Allow-Origin",
                             operation: "set", value: "*"
                         },
                     ]
                 },
                 condition: {
                     resourceTypes: ["main_frame", "sub_frame"],
                 }
             }]
         }).catch((error) => console.error('Rule Update Error:', error));
     });
   }
   
   // Call the initiate function
   initiate();