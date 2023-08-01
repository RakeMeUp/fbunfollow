// PASTE IT IN CONSOLE, THE WHOLE FILE

/* 
    There are multiple types of cards here (fuck this shit)
    - sites you follow AND has a 'following' aria-label,
      these have settings menu
    - sites you DON'T follow, these doesnt have 'following' aria-label
    - sites you follow BUT the following is in 'More options' aria-label
    - friends you DON'T follow, then it has a 'Follow' aria-label OR in moreOptions it has 'follow'
    - friends you follow AND has 'following aria-label

    if card has 'Follow' aria-label:
        skip
    if card has 'Unfollow' aria-label:
        [CLICK ON UNFOLLOW]
        if its a settingsMenu:
            handleSettingsMenu
        else:
            handleFollowMenu
    else:
        [CLICK ON MORE_OPTIONS]
        if in the moreOptions it has 'Follow' menuitem:
            skip
        if in the moreOptions it has 'Unfollow' menuitem:
            [CLICK ON UNFOLLOW_MENUITEM]
            handleSettingsMenu
*/

// HAS TO BE ON PAGE https://www.facebook.com/{{USERNAME}}/following
const CARD_SELECTOR = ".x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1olyfxc.x9f619.x78zum5.x1e56ztr.xyamay9.x1pi30zi.x1l90r2v.x1swvt13.x1gefphp";
const PREVIEW_SELECTOR = '[aria-label="Link preview"]';
const LINK_SELECTOR = "a";
const MORE_SELECTOR = '[aria-label="See options"]';
const MENU_SELECTOR = '[role="menu"]';
const SETTINGS_SELECTOR = '[aria-label="Follow settings"]'
const UPDATE_SELECTOR = '[aria-label="Update"]';
const MENU_ITEM_SELECTOR = '[role="menuitem"]';
const HUMAN_FOLLOWING_SELECTOR = '[aria-label="Following"]';
const RADIO_SELECTOR = '[role="radio"]';


const findElementWithRetry = (querySelectorString) => {
  const element = document.querySelector(querySelectorString)
  if (element) {
    return element;
  } else {
    //calls itself again if not found
    setTimeout(findElementWithRetry, 100);
  }
}

const clickMore = () =>{
  const preview = document.querySelector(PREVIEW_SELECTOR)
  if (preview) {
    const moreOptions: HTMLElement | null = preview.querySelector(MORE_SELECTOR);
    moreOptions?.click();
  } else {
    //calls itself again if not found
    setTimeout(clickMore, 100);
  }
};

const clickMoreMenuFollowing = ()=>{
  const menu = document.querySelector(MENU_SELECTOR)
  if (menu) {
    const spans = menu.querySelectorAll("span");
    spans.forEach(s=>{
      if(s.textContent?.includes('Following')){
        s.click();
      }
    })
  } else {
    //calls itself again if not found
    setTimeout(clickMoreMenuFollowing, 100);
  }
}

const selectUnfollowAndSave = ()=>{
  const settingsMenu = document.querySelector(SETTINGS_SELECTOR)
  if (settingsMenu) {
    //Theres 3 radio opts, we always need the third
    const radios: NodeListOf<HTMLElement> = settingsMenu.querySelectorAll(RADIO_SELECTOR);
    radios[2].click();

    //click is too fast, wont register without delay
    const updateBtn: HTMLElement | null = settingsMenu.querySelector(UPDATE_SELECTOR)
    setTimeout(()=>updateBtn?.click(), 100);
  } else {
    //calls itself again if not found
    setTimeout(selectUnfollowAndSave, 100);
  }
}

/* const clickUnfollow = (card) => {
  const unfollowBtn = card.querySelector(HUMAN_FOLLOWING_SELECTOR);
  if (unfollowBtn) {
    unfollowBtn.click();
  } else {
    //calls itself again if not found
    setTimeout(clickUnfollow, 100);
  }
} */
/* const clickMenuUnfollow = () => {

}
const menuitems = unfollowBtn.querySelectorAll(MENU_ITEM_SELECTOR);
if (menuitems) {
  menuitems[menuitems.length-1].click();
} else {
  //calls itself again if not found
  setTimeout(humanCardUnfollow, 100);} */

const cards = document.querySelectorAll(CARD_SELECTOR);
cards.forEach((card,index) => {
  setTimeout(() => {
    //SIMULATE MOUSEOVER
    const link = card.querySelector(LINK_SELECTOR);
    const ev = new MouseEvent('mouseover', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    link?.dispatchEvent(ev);
    //----------------------------



    clickMore();
    clickMoreMenuFollowing();
    selectUnfollowAndSave();
    /* clickUnfollow(); */
  }, index*1000);
});
