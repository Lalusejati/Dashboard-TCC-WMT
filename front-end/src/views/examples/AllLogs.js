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
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const allLogsData = [
  {
    time: "14/11/2025 10:00",
    location: "Jakarta",
    customerId: "12345",
    toolId: "WM-001",
    technician: "Budi",
    error: "6.2%",
    status: "Ganti",
    statusClass: "bg-danger",
  },
  {
    time: "14/11/2025 09:30",
    location: "Bandung",
    customerId: "67890",
    toolId: "WM-002",
    technician: "Andi",
    error: "2.1%",
    status: "Akurat",
    statusClass: "bg-success",
  },
  {
    time: "13/11/2025 15:00",
    location: "Surabaya",
    customerId: "54321",
    toolId: "WM-001",
    technician: "Budi",
    error: "-1.5%",
    status: "Akurat",
    statusClass: "bg-success",
  },
  {
    time: "13/11/2025 14:00",
    location: "Jakarta",
    customerId: "98765",
    toolId: "WM-003",
    technician: "Citra",
    error: "7.8%",
    status: "Ganti",
    statusClass: "bg-danger",
  },
  {
    time: "12/11/2025 11:00",
    location: "Yogyakarta",
    customerId: "11223",
    toolId: "WM-002",
    technician: "Andi",
    error: "0.5%",
    status: "Akurat",
    statusClass: "bg-success",
  },
  {
    time: "12/11/2025 10:00",
    location: "Jakarta",
    customerId: "44556",
    toolId: "WM-001",
    technician: "Budi",
    error: "-0.2%",
    status: "Akurat",
    statusClass: "bg-success",
  },
];

class AllLogs extends React.Component {
  state = {
    logs: allLogsData,
    searchTerm: "",
    filterStatus: "Semua",
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleFilter = (event) => {
    this.setState({ filterStatus: event.target.value });
  };

  render() {
    const { logs, searchTerm, filterStatus } = this.state;

    const filteredLogs = logs
      .filter((log) => {
        // Filter by status
        if (filterStatus === "Semua") {
          return true;
        }
        return log.status === filterStatus;
      })
      .filter((log) => {
        // Search by customer ID
        return log.customerId.toLowerCase().includes(searchTerm.toLowerCase());
      });

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
                  <Row className="align-items-center">
                    <Col xs="12" md="4">
                      <h3 className="mb-0">Laporan Histori Lengkap</h3>
                    </Col>
                    <Col xs="12" md="4">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Cari ID Pelanggan"
                            type="text"
                            value={this.state.searchTerm}
                            onChange={this.handleSearch}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="4">
                      <FormGroup className="mb-0">
                        <Input
                          type="select"
                          value={this.state.filterStatus}
                          onChange={this.handleFilter}
                        >
                          <option value="Semua">Semua Status</option>
                          <option value="Akurat">Akurat</option>
                          <option value="Ganti">Ganti</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Waktu Uji</th>
                      <th scope="col">Lokasi</th>
                      <th scope="-col">ID Pelanggan</th>
                      <th scope="col">ID Alat</th>
                      <th scope="col">Teknisi</th>
                      <th scope="col">Hasil Error</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, index) => (
                      <tr key={index}>
                        <td>{log.time}</td>
                        <td>{log.location}</td>
                        <td>{log.customerId}</td>
                        <td>{log.toolId}</td>
                        <td>{log.technician}</td>
                        <td>{log.error}</td>
                        <td>
                          <span className="badge badge-dot mr-4">
                            <i className={log.statusClass} />
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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
