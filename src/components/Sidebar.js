import React from 'react';
import CreateRoomModalbtn from './dashboard/CreateRoomModalbtn';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
        <CreateRoomModalbtn />
      </div>
      Bottom
    </div>
  );
};

export default Sidebar;
