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

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  CardBody,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class TestDetails extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Detail Pengujian</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <p className="text-white">
                        <strong>ID Pelanggan:</strong> 12345
                      </p>
                      <p className="text-white">
                        <strong>Waktu:</strong> 14/11/2025 10:00
                      </p>
                      <p className="text-white">
                        <strong>Lokasi:</strong> Jakarta
                      </p>
                      <p className="text-white">
                        <strong>Teknisi:</strong> John Doe
                      </p>
                    </Col>
                  </Row>
                  <hr className="my-4" />
                  <h4 className="text-white">Hasil Tes Sesi 1 (10L)</h4>
                  <Row>
                    <Col>
                      <p className="text-white">Volume Alat Ukur: 10.00 L</p>
                      <p className="text-white">
                        Volume Meteran Pelanggan: 10.70 L
                      </p>
                      <p className="text-white">% Error Sesi 1: 7.0%</p>
                    </Col>
                  </Row>
                  <hr className="my-4" />
                  <h4 className="text-white">Hasil Tes Sesi 2 (10L)</h4>
                  <Row>
                    <Col>
                      <p className="text-white">Volume Alat Ukur: 10.00 L</p>
                      <p className="text-white">
                        Volume Meteran Pelanggan: 10.70 L
                      </p>
                      <p className="text-white">% Error Sesi 2: 7.0%</p>
                    </Col>
                  </Row>
                  <hr className="my-4" />
                  <h4 className="text-white">Hasil Tes Sesi 3 (10L)</h4>
                  <Row>
                    <Col>
                      <p className="text-white">Volume Alat Ukur: 10.00 L</p>
                      <p className="text-white">
                        Volume Meteran Pelanggan: 10.70 L
                      </p>
                      <p className="text-white">% Error Sesi 3: 7.0%</p>
                    </Col>
                  </Row>
                  <hr className="my-4" />
                  <h4 className="text-white">Hasil Akhir (Kesimpulan)</h4>
                  <Row>
                    <Col>
                      <p className="text-white">% ERROR RATA-RATA: 5.8%</p>
                      <h2 className="text-danger">
                        STATUS: TIDAK AKURAT (HARUS DIGANTI)
                      </h2>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default TestDetails;
