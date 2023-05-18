import DropDown from 'component/common/DropDown/DropDown'
import InputBox from 'component/common/InputBox/InputBox'
import NormalButton from 'component/common/NormalButton/NormalButton'
import { history } from 'helpers'
import React from 'react'
import './style.scss'

const KnowledgeCenterComp = () => {
  return (
    <div className="px-5 py-3 knowledge_center">
        <h6>Knowledge Center</h6>
      <div className="row align-items-center">
        <div className="col-3">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Title, Email"
            name="search"
            Iconic
            Search
            // value={search}
            // onChange={(e) => {
            //   setsearch(e.target.value);
            //   setactivePage(1);
            // }}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Sub Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Status"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-1"></div>
        <div className="col-2">
          <NormalButton
            className="loginButton"
            label={"Add New"}
            onClick={() => history.push("/admin/add-knowledge")}
          />
        </div>
        </div>
    </div>
  )
}

export default KnowledgeCenterComp