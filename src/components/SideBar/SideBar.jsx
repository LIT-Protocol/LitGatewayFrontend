import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import cx from 'classnames'

import styles from './sidebar.module.scss'

import { Badge } from '@consta/uikit/Badge'

import { useAppContext } from '../../context/app'

const SideBar = () => {
  const { sideBar, setSideBar } = useAppContext()

  const [activeMainItem, setActiveMainItem] = useState(null)

  const location = useLocation()

  const menuItems = [
    {
      title: 'Discover',
      icon: (
        <svg
          width="37"
          height="37"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.5195 3.84644C10.2395 3.84644 3.53455 10.5664 3.53455 18.8464C3.53455 27.1264 10.2395 33.8464 18.5195 33.8464C26.8145 33.8464 33.5345 27.1264 33.5345 18.8464C33.5345 10.5664 26.8145 3.84644 18.5195 3.84644ZM28.9145 12.8464H24.4895C24.0095 10.9714 23.3195 9.17144 22.4195 7.50644C25.1795 8.45144 27.4745 10.3714 28.9145 12.8464ZM18.5345 6.90644C19.7795 8.70644 20.7545 10.7014 21.3995 12.8464H15.6695C16.3145 10.7014 17.2895 8.70644 18.5345 6.90644ZM6.92455 21.8464C6.68455 20.8864 6.53455 19.8814 6.53455 18.8464C6.53455 17.8114 6.68455 16.8064 6.92455 15.8464H11.9945C11.8745 16.8364 11.7845 17.8264 11.7845 18.8464C11.7845 19.8664 11.8745 20.8564 11.9945 21.8464H6.92455ZM8.15455 24.8464H12.5795C13.0595 26.7214 13.7495 28.5214 14.6495 30.1864C11.8895 29.2414 9.59455 27.3364 8.15455 24.8464ZM12.5795 12.8464H8.15455C9.59455 10.3564 11.8895 8.45144 14.6495 7.50644C13.7495 9.17144 13.0595 10.9714 12.5795 12.8464ZM18.5345 30.7864C17.2895 28.9864 16.3145 26.9914 15.6695 24.8464H21.3995C20.7545 26.9914 19.7795 28.9864 18.5345 30.7864ZM22.0445 21.8464H15.0245C14.8895 20.8564 14.7845 19.8664 14.7845 18.8464C14.7845 17.8264 14.8895 16.8214 15.0245 15.8464H22.0445C22.1795 16.8214 22.2845 17.8264 22.2845 18.8464C22.2845 19.8664 22.1795 20.8564 22.0445 21.8464ZM22.4195 30.1864C23.3195 28.5214 24.0095 26.7214 24.4895 24.8464H28.9145C27.4745 27.3214 25.1795 29.2414 22.4195 30.1864ZM25.0745 21.8464C25.1945 20.8564 25.2845 19.8664 25.2845 18.8464C25.2845 17.8264 25.1945 16.8364 25.0745 15.8464H30.1445C30.3845 16.8064 30.5345 17.8114 30.5345 18.8464C30.5345 19.8814 30.3845 20.8864 30.1445 21.8464H25.0745Z"
            fill="white"
          />
        </svg>
      ),
      to: '/discover',
      subItems: [
        {
          title: 'Apps',
          to: '/apps',
        },
        {
          title: 'Offers',
          to: '/offers',
        },
      ],
    },
    {
      title: 'Minter',
      to: '/minter',
      icon: (
        <svg
          width="28"
          height="31"
          viewBox="0 0 28 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99567 0.846436C8.24255 0.846436 7.63203 1.45696 7.63203 2.21007V3.76852C7.63203 4.52163 8.24255 5.13215 8.99567 5.13215H9.76613V13.7038L6.52761 18.9067L20.4714 17.1876L18.3028 13.7036L18.3026 5.13215H19.0732C19.8263 5.13215 20.4368 4.52163 20.4368 3.76852V2.21007C20.4368 1.45696 19.8263 0.846436 19.0732 0.846436H8.99567Z"
            fill="#DADADA"
          />
          <path
            d="M21.7195 19.1926L5.07206 21.2451L0.652461 28.3453C-0.026014 29.4353 0.757767 30.8464 2.04168 30.8464H26.0274C27.3113 30.8464 28.0951 29.4353 27.4166 28.3453L21.7195 19.1926Z"
            fill="#DADADA"
          />
        </svg>
      ),
    },
    {
      title: 'Gallery',
      to: '/gallery',
      disabled: true,
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H13.3333V13.3333H0V0Z" fill="#DFDFDF" />
          <path d="M0 16.6667H13.3333V30H0V16.6667Z" fill="#DFDFDF" />
          <path d="M16.6667 0H30V13.3333H16.6667V0Z" fill="#DFDFDF" />
          <path d="M16.6667 16.6667H30V30H16.6667V16.6667Z" fill="#DFDFDF" />
        </svg>
      ),
    },
    {
      title: 'Files',
      to: '/files',
      icon: (
        <svg
          width="25"
          height="31"
          viewBox="0 0 25 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.53455 0.846436C1.88455 0.846436 0.549546 2.19644 0.549546 3.84644L0.534546 27.8464C0.534546 29.4964 1.86955 30.8464 3.51955 30.8464H21.5345C23.1845 30.8464 24.5345 29.4964 24.5345 27.8464V9.84644L15.8274 1.13933C15.6399 0.951792 15.3855 0.846436 15.1203 0.846436H3.53455ZM15.0345 11.3464C14.4823 11.3464 14.0345 10.8987 14.0345 10.3464V3.09644L22.2845 11.3464H15.0345ZM5.03455 17.3464H20.0345V20.3464H5.03455V17.3464ZM14.0345 21.8464H5.03455V24.8464H14.0345V21.8464Z"
            fill="#DADADA"
          />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    setActiveMainItem(null)
    if (location.pathname) {
      const findMainItem = menuItems.find((item) => {
        const subItem = item?.subItems?.find(
          (sItem) => sItem.to === location.pathname,
        )
        if (subItem && subItem.to !== item.to) {
          return item
        }
      })
      if (findMainItem) {
        setActiveMainItem(findMainItem.to)
      }
    }
  }, [location.pathname])

  return (
    <div className={cx(styles.sideBar, sideBar ? styles.activeSideBar : null)}>
      <div className={styles.menu} onClick={() => setSideBar(false)}>
        {menuItems.map((item) => (
          <>
            {!item.disabled ? (
              <NavLink
                exact
                activeClassName={styles.activeMainItem}
                to={item.to}
              >
                <div
                  className={cx(
                    styles.mainItem,
                    activeMainItem === item.to ? styles.highlight : null,
                  )}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <span>{item.title}</span>
                </div>
              </NavLink>
            ) : (
              <div className={cx(styles.mainItem, styles.disabled)}>
                <div className={styles.icon}>{item.icon}</div>
                <span>{item.title}</span>
                <Badge
                  className={cx(styles.badge)}
                  style={{ marginTop: '3px' }}
                  size="s"
                  status="system"
                  label="Coming soon"
                  form="round"
                />
              </div>
            )}
            {item?.subItems?.map((subItem) => (
              <>
                {!subItem.disabled ? (
                  <NavLink
                    activeClassName={styles.activeSubItem}
                    to={subItem.to}
                  >
                    <div className={styles.subItem}>{subItem.title}</div>
                  </NavLink>
                ) : (
                  <div className={cx(styles.subItem, styles.disabled)}>
                    {subItem.title}
                    <Badge
                      className={styles.badge}
                      status="system"
                      label="Coming soon"
                      form="round"
                    />
                  </div>
                )}
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

export default SideBar
