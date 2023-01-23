import { useMemo, useState } from 'react';
import { generateAlerts } from '@astrouxds/mock-data';
import {
  RuxClock,
  RuxGlobalStatusBar,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxMonitoringIcon,
  RuxPopUp,
  RuxRadio,
  RuxRadioGroup,
  RuxStatus,
} from '@astrouxds/react';

import './global-status-bar.css';

const version = process.env.REACT_APP_VERSION || 'version undefined';
const name = process.env.REACT_APP_NAME || 'app name undefined';
const toTitleCase = (wd: string) => wd.charAt(0).toUpperCase() + wd.slice(1);

const GlobalStatusBar = () => {
  const alerts = useMemo(() => generateAlerts(15), []);
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (e: CustomEvent) => {
    setIsOpen(false);

    if (e.detail === 'all') {
      return setFilteredAlerts(alerts);
    }

    setFilteredAlerts(alerts.filter(a => a.category === e.detail));
  };

  return (
    <RuxGlobalStatusBar
      // appDomain='ASTRO'
      appName={name.split('-').map(toTitleCase).join(' ')}
      appVersion={version}
      username='tuser'
      appState='App state tag'
      appStateColor='tag1'
    >
      {/* main menu pop-up */}
      <RuxPopUp
        slot='left-side'
        placement='bottom-start'
        className='Global-status-bar__menu'
      >
        <RuxIcon slot='trigger' size='2rem' icon='apps' />

        <RuxMenu>
          {/* sub menu pop-up 1 */}
          <RuxPopUp className='Global-status-bar__sub-menu'>
            <RuxMenuItem slot='trigger'>Menu Item 1</RuxMenuItem>

            <RuxMenu>
              <RuxMenuItem>Sub-menu Item 1.1</RuxMenuItem>
              <RuxMenuItem>Sub-menu Item 1.2</RuxMenuItem>
              <RuxMenuItem>Sub-menu Item 1.3</RuxMenuItem>
              <RuxMenuItem>Sub-menu Item 1.4</RuxMenuItem>
            </RuxMenu>
          </RuxPopUp>
          {/* sub menu pop-up 2 */}
          <RuxPopUp>
            <RuxMenuItem slot='trigger'>Menu Item 2</RuxMenuItem>

            <RuxMenu>
              <RuxMenuItem>Sub-menu Item 2.1</RuxMenuItem>
              <RuxMenuItem>Sub-menu Item 2.2</RuxMenuItem>
              <RuxMenuItem>Sub-menu Item 2.3</RuxMenuItem>
              <RuxMenuItem>Sub-menu Item 2.4</RuxMenuItem>
            </RuxMenu>
          </RuxPopUp>
          {/* no pop-up on main menu items 3 or 4 */}
          <RuxMenuItem>Menu Item 3</RuxMenuItem>
          <RuxMenuItem>Menu Item 4</RuxMenuItem>
        </RuxMenu>
      </RuxPopUp>

      <RuxClock />

      <aside className='Global-status-bar__icons' slot='right-side'>
        <RuxPopUp placement='bottom-end'>
          <RuxMonitoringIcon
            slot='trigger'
            notifications={alerts.length}
            label='Alerts'
            icon='notification-important'
            status='caution'
          />

          <div className='Global-status-bar__list'>
            <header>
              <h3>Alerts</h3>

              <RuxPopUp placement='bottom-end' open={isOpen}>
                <RuxIcon
                  onClick={() => setIsOpen(prev => !prev)}
                  slot='trigger'
                  size='1.5rem'
                  icon='filter-list'
                />

                <div>
                  <header>Category</header>

                  <RuxRadioGroup onRuxchange={handleSelect}>
                    <RuxRadio value='all'>All</RuxRadio>
                    <RuxRadio value='spacecraft'>Spacecraft</RuxRadio>
                    <RuxRadio value='software'>Software</RuxRadio>
                    <RuxRadio value='hardware'>Hardware</RuxRadio>
                  </RuxRadioGroup>
                </div>
              </RuxPopUp>
            </header>

            <ul>
              {filteredAlerts.map(({ id, category, message, status }) => (
                <li key={id}>
                  <div className='h-stack'>
                    <RuxStatus status={status} />
                    <p>{message}</p>
                  </div>
                  <p>{toTitleCase(category)}</p>
                </li>
              ))}
            </ul>
          </div>
        </RuxPopUp>
      </aside>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
