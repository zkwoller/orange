import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { history, useRouteProps } from '@umijs/max';
import { Empty, Input, Layout, Menu, MenuProps, Popover, Tooltip } from 'antd';
import { MenuItemType } from 'antd/lib/menu/interface';
import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useMemoizedFn } from 'ahooks';
import logoHeader from '../layoutMenu/images/logoHeader.png';
import styles from './index.less';

export type Route = {
  name: string;
  path: string;
  component?: string;
  hideInMenu?: boolean;
  redirect?: string;
  routes?: Route[];
  accessKey?: string;
  layout?: boolean;
  icon?: JSX.Element;
};

type PropsType = {
  menuItems: Route[];
  extra?: React.ReactNode;
  routeLink?: (path: string) => void;
};
const { Sider } = Layout;

const filterByMenuData = (data: Route[], keyWord?: string): Route[] => {
  if (keyWord && data.length) {
    return data
      .map((item) => {
        if (item.name?.includes(keyWord)) {
          return { ...item };
        }
        const routes = filterByMenuData(item.routes || [], keyWord);
        if (routes.length > 0) {
          return { ...item, routes };
        }
        return undefined;
      })
      .filter((item) => item) as Route[];
  }
  return [] as Route[];
};

const routesToMenu = (routes?: Route[]): MenuItemType[] | undefined => {
  if (!routes) {
    return undefined;
  }
  return routes.map((route) => {
    return {
      label: route.name,
      key: route.path,
      children: routesToMenu(route.routes),
    };
  });
};
const SubMenus = ({
  routes,
  routeLink,
}: {
  routes?: Route[];
  routeLink?: (path: string) => void;
}) => {
  const { path } = useRouteProps();
  const defaultOpenKeys = useMemo(() => {
    return routes?.filter((f) => f.routes).map((m) => m.path);
  }, [routes]);

  if (!routes || routes.length === 0) {
    return (
      <div style={{ textAlign: 'center', height: '100%' }}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }
  const items = routesToMenu(routes);
  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (routeLink) {
      routeLink(key);
    } else {
      history.push(key);
    }
  };
  return (
    <div className={styles.submenu}>
      <Menu
        style={{ width: 200 }}
        mode="inline"
        items={items}
        selectedKeys={[path]}
        onClick={handleClick}
        openKeys={defaultOpenKeys}
      />
    </div>
  );
};

const BaseSider = ({ menuItems = [], extra, routeLink }: PropsType) => {
  const lastX = useRef(0);
  const { path } = useRouteProps();
  const currentMenu = useMemo(() => {
    return menuItems.find(
      (f) => window.location.pathname.indexOf(f.path) !== -1,
    );
  }, [menuItems]);
  const [selectMenu, setSelectMenu] = useState<Route | undefined>(currentMenu);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>();
  const [width, setWidth] = useState(50);

  useEffect(() => {
    if (collapsed || searchWord) {
      setSelectMenu(
        menuItems.find((f) => window.location.pathname.indexOf(f.path) !== -1),
      );
    }
  }, [collapsed, menuItems, path, searchWord]);

  const subMenusPop = useCallback(
    (route: Route) => {
      if (route.routes) {
        return (
          <div className={classNames(styles.concrete, styles.concretePop)}>
            <div className={styles.concreteTitle}>
              {route?.icon}
              <span>{route?.name}</span>
            </div>
            <SubMenus routeLink={routeLink} routes={route.routes} />
          </div>
        );
      }
      return route.name;
    },
    [routeLink],
  );
  const handleSider = (route: Route) => {
    if (!route.routes) {
      if (routeLink) {
        routeLink(route.path);
      } else {
        history.push(route.path);
      }
    }
    if (!collapsed) {
      setSelectMenu(route);
    }
  };

  const handleDrag = useMemoizedFn((e: React.MouseEvent) => {
    const currentX = e.clientX; // 当前鼠标位置
    if (currentX === 0) {
      return;
    }
    // 鼠标向右移动
    if (currentX - lastX.current > 0) {
      lastX.current = currentX;
      setWidth(150);
    } else if (lastX.current - currentX > 0) {
      lastX.current = currentX;
      setWidth(50);
    }
  });
  const handleMouseDown = (event: React.MouseEvent) => {
    lastX.current = event.clientX;
  };
  return (
    <>
      <Sider className={styles.baseSider} width={width}>
        <div className={styles.baseSiderMain}>
          <div className={styles.baseSiderLogo}>
            <div className={styles.baseSiderLogoImg}>
              <img src={logoHeader} />
            </div>
            {width === 150 && <div>长龙航空</div>}
          </div>
          <div className={styles.baseSiderMenus}>
            {menuItems.map((item) => (
              <Popover
                key={item.path}
                content={collapsed ? subMenusPop(item) : item.name}
                placement="right"
                overlayClassName={classNames({
                  [styles.baseSiderMenuPopover]: collapsed && item.routes,
                })}
              >
                <div
                  key={item.path}
                  onClick={() => handleSider(item)}
                  className={classNames(styles.baseSiderMenu, {
                    [styles.baseSiderSelected]: item.path === selectMenu?.path,
                  })}
                >
                  <div className={styles.baseSiderMenuTitle}>
                    <span className={styles.baseSiderMenuIcon}>
                      {item.icon}
                    </span>
                    {width === 150 && <span>{item.name}</span>}
                  </div>
                </div>
              </Popover>
            ))}
          </div>
        </div>
        <div
          className={classNames(styles.siderExtra, {
            [styles.siderExtraWidth]: width === 150,
          })}
        >
          {extra}
          <Tooltip placement="right" title={collapsed ? '收起' : '展开'}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              },
            )}
          </Tooltip>
        </div>
      </Sider>
      <div onMouseDown={handleMouseDown} className={styles.mouseMove}>
        <div draggable onDrag={handleDrag} />
      </div>
      <div
        className={classNames(styles.concrete, {
          [styles.concreteCollapsed]: collapsed,
        })}
      >
        <div className={styles.sysTitle}>{document.title}</div>
        <Popover
          placement="bottom"
          trigger="focus"
          content={
            <SubMenus
              routeLink={routeLink}
              routes={filterByMenuData(menuItems, searchWord)}
            />
          }
          overlayClassName={classNames(
            styles.baseSiderMenuPopover,
            styles.concretePop,
            styles.searchPopover,
          )}
          overlayStyle={{
            padding: 0,
            boxShadow:
              '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
          }}
          showArrow={false}
        >
          <Input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            suffix={<SearchOutlined />}
            className={styles.search}
            placeholder="菜单搜索"
          />
        </Popover>
        {selectMenu && (
          <div className={styles.concreteTitle}>
            {selectMenu?.icon}
            <span>{selectMenu?.name}</span>
          </div>
        )}
        <SubMenus routeLink={routeLink} routes={selectMenu?.routes} />
      </div>
    </>
  );
};
export default BaseSider;
