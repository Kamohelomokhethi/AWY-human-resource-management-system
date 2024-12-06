import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Training = () => {
    const [subMenuOpen, setSubMenuOpen] = useState({
        staffInfo: false,
        professionalDev: false,
        procurement: false,
    });

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const toggleButton = document.getElementById('toggle-btn');
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
        closeAllSubMenus();
    };

    const toggleSubMenu = (menu) => {
     // const menu = submenu
        if (!subMenuOpen[menu]) {
            closeAllSubMenus();
        }
        setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
        if (document.getElementById('sidebar').classList.contains('close')) {
            toggleSidebar();
        }
    };

    const closeAllSubMenus = () => {
        setSubMenuOpen({
            staffInfo: false,
            professionalDev: false,
            procurement: false,
        });
        const subMenus = document.querySelectorAll('.sub-menu');
        subMenus.forEach((menu) => menu.classList.remove('show'));
        const dropdownBtns = document.querySelectorAll('.dropdown-btn');
        dropdownBtns.forEach((btn) => btn.classList.remove('rotate'));
    };


  return (
    <div className="body">
      <nav id="sidebar">
        <ul>
          <li>
            <span className="logo">AWY HR System</span>
            <button onClick={toggleSidebar} id="toggle-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
              </svg>
            </button>
          </li>
          <li>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
              </svg>

              <span>Home</span>
            </a>
          </li>
          <li>
            <button
              onClick={() => toggleSubMenu("staffInfo")}
              // className="dropdown-btn" //first bug
              className={`dropdown-btn ${
                subMenuOpen.staffInfo ? "rotate" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z" />
              </svg>

              <span>Staff Info</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
              </svg>
            </button>
            {subMenuOpen.staffInfo && (
              <ul
                //second bug className="sub-menu"
                className={`sub-menu ${subMenuOpen.staffInfo ? "show" : ""}`}
              >
                <div>
                  <li  className="active"><Link to={"/Add-Member"}>Add Member</Link></li>
                  <li><Link to={"/UpdateMember"}>Update Member</Link></li> 
                  <li><Link to={"/DeleteMember"}>Delete Member</Link></li>
                  <li><Link to={"/SearchMember"}>Search Member</Link></li>
                </div>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleSubMenu("professionalDev")}
              //</li>className="dropdown-btn">
              className={`dropdown-btn ${
                subMenuOpen.professionalDev ? "rotate" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
              </svg>

              <span>Professional Dev</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
              </svg>
            </button>
            {subMenuOpen.professionalDev && (
              <ul
                className={`sub-menu ${
                  subMenuOpen.professionalDev ? "show" : ""
                }`}
              >
                <div>
                  <li>
                    <a href="#">Track Dev</a>
                  </li>
                  <li>
                    <Link to={"#"}>Training Schedule</Link>
                  </li>
                  <li>
                  <Link to={"#"}>Points Overview</Link>
                  </li>
                </div>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleSubMenu("procurement")}
              //</li>className="dropdown-btn">
              className={`dropdown-btn ${
                subMenuOpen.procurement ? "rotate" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" />
              </svg>
              <span>Procurement</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
              </svg>
            </button>
            {subMenuOpen.procurement && (
              <ul
                className={`sub-menu ${subMenuOpen.procurement ? "show" : ""}`}
              >
                <div>
                <li><Link to={"/Add-vehicle"}>Add vehicle</Link></li>
                  <li><Link to={"/Search-car"}>Search Vehicle</Link></li>
                  <li><Link to={"/Vehicle-status"}>Vehicle Status</Link></li>
                </div>
              </ul>
            )}
          </li>
        </ul>
      </nav>

    
    </div>
  );
};

export default Training;
