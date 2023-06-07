import React, { Component, Suspense, useEffect } from "react";
import { Route, Router, Redirect } from "react-router-dom";
import Routers from "./routes";
import * as Layout from "../layout";
import { history } from "../helpers";
import CodeSplitter from "helpers/CodeSplitter";
import { NotificationContainer } from "react-notifications";
import { connect } from "react-redux";
import { InitialLoader } from "component/common/Loader";
import Privileges from "helpers/privileges";

function Wrapper({ Component, ...props }) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return <Component {...props} />;
}

class RoutesClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      renderRoute: false,
      pathname: null,
      loading: true
    };
  }

  fetchInitialData = async () => {
    const { adminPrivileges } = this.props;
    await adminPrivileges();
    this.setState({ ...this.state, loading: false });
  }

  componentWillMount() {
    console.log("mounted")
    this.fetchInitialData();
  }

  render() {
    const { privilegesData } = this.props;
    const { loading } = this.state;
    console.log("privilegesDataprivilegesData", privilegesData)
    if (loading) return <InitialLoader />;

    return (
      <Router history={history}>
        <Suspense fallback={<InitialLoader />}>
          {Routers.map(
            ({
              component,
              name,
              componentPath = "",
              redirect,
              path,
              exact = false,
              auth = true,
              childrens = [],
            }) => {
              if (childrens.length > 0) {
                return (
                  <Route
                    path={path}
                    exact={exact}
                    key={path}
                    render={(props) => {
                      if (redirect) {
                        if (props.location.pathname == path) {
                          props.history.push(redirect);
                        }
                      }

                      const LayoutComponent = Layout[component];
                      return (
                        <LayoutComponent {...props} privilegesData={privilegesData}>
                          {childrens.map(
                            ({
                              component: ChildrenComponent,
                              componentPath: childComponentPath,
                              name = "",
                              path: childrenPath,
                              exact = false,
                              auth = true,
                            }) => {
                              CodeSplitter.addComponent(
                                childComponentPath,
                                name
                              );

                              return (
                                <Route
                                  path={path + childrenPath}
                                  exact={exact}
                                  key={path + childrenPath}
                                  render={props => {
                                    let PageComponent = CodeSplitter.getComponent(name);
                                    return (
                                      <Wrapper
                                        {...props}
                                        privilegesData={privilegesData}
                                        Component={PageComponent}
                                      />
                                    )
                                  }}
                                />
                              );
                            }
                          )}
                        </LayoutComponent>
                      );
                    }}
                  />
                );
              }

              CodeSplitter.addComponent(componentPath, name);

              return (
                <Route
                  path={path}
                  exact={exact}
                  key={component || 2322}
                  render={props => {
                    if (component) {
                      let PageComponent = CodeSplitter.getComponent(name);
                      return (
                        <Wrapper
                          {...props}
                          privilegesData={privilegesData}
                          Component={PageComponent}
                        />
                      )
                    }

                    if (redirect) {
                      if (props.location.pathname == path) {
                        return <Redirect to={redirect} />;
                      }
                    }

                    return <div />;
                  }}
                />
              );
            }
          )}
          <NotificationContainer />
        </Suspense>
      </Router>
    );
  }
}

const mapState = state => ({
  privilegesData: state?.home?.privileges
});

const mapDispatch = {
  adminPrivileges: Privileges
}

export default connect(mapState, mapDispatch)(RoutesClass);