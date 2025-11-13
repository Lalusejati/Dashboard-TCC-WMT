/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
import "chartjs-plugin-datalabels";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="mb-0">Grafik Tren Error Mingguan</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1.data}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Distribusi
                      </h6>
                      <h2 className="mb-0">Status Meter</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Doughnut
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Log Pengujian Terakhir</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        tag={Link}
                        to="/admin/all-logs"
                        size="sm"
                      >
                        Lihat semua
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Waktu Uji</th>
                      <th scope="col">Lokasi</th>
                      <th scope="col">ID Pelanggan</th>
                      <th scope="col">Hasil Error</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">14/11/2025 10:00</th>
                      <td>Jakarta</td>
                      <td>12345</td>
                      <td>6.2%</td>
                      <td>
                        <i className="fas fa-arrow-up text-danger mr-3" /> Ganti
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">14/11/2025 09:30</th>
                      <td>Bandung</td>
                      <td>67890</td>
                      <td>2.1%</td>
                      <td>
                        <i className="fas fa-arrow-down text-success mr-3" />{" "}
                        Akurat
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">13/11/2025 15:00</th>
                      <td>Surabaya</td>
                      <td>54321</td>
                      <td>-1.5%</td>
                      <td>
                        <i className="fas fa-arrow-down text-success mr-3" />{" "}
                        Akurat
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">13/11/2025 14:00</th>
                      <td>Jakarta</td>
                      <td>98765</td>
                      <td>7.8%</td>
                      <td>
                        <i className="fas fa-arrow-up text-danger mr-3" /> Ganti
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
