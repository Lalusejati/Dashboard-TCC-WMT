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
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class AllLogs extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Log Pengujian Terakhir</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Waktu Uji</th>
                      <th scope="col">Lokasi</th>
                      <th scope="col">ID Pelanggan</th>
                      <th scope="col">ID Alat</th>
                      <th scope="col">Teknisi</th>
                      <th scope="col">Hasil Error</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>14/11/2025 10:00</td>
                      <td>Jakarta</td>
                      <td>12345</td>
                      <td>WM-001</td>
                      <td>Budi</td>
                      <td>6.2%</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-danger" />
                          Ganti
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>14/11/2025 09:30</td>
                      <td>Bandung</td>
                      <td>67890</td>
                      <td>WM-002</td>
                      <td>Andi</td>
                      <td>2.1%</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-success" />
                          Akurat
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>13/11/2025 15:00</td>
                      <td>Surabaya</td>
                      <td>54321</td>
                      <td>WM-001</td>
                      <td>Budi</td>
                      <td>-1.5%</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-success" />
                          Akurat
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>13/11/2025 14:00</td>
                      <td>Jakarta</td>
                      <td>98765</td>
                      <td>WM-003</td>
                      <td>Citra</td>
                      <td>7.8%</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-danger" />
                          Ganti
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>12/11/2025 11:00</td>
                      <td>Yogyakarta</td>
                      <td>11223</td>
                      <td>WM-002</td>
                      <td>Andi</td>
                      <td>0.5%</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-success" />
                          Akurat
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>12/11/2025 10:00</td>
                      <td>Jakarta</td>
                      <td>44556</td>
                      <td>WM-001</td>
                      <td>Budi</td>
                      <td>-0.2%</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-success" />
                          Akurat
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default AllLogs;
