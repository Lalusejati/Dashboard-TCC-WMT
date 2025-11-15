import React, { useState, useEffect } from "react";
import ApiAxios from "network/ApiAxios";

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
  Spinner,
  Button,
  ButtonGroup,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const AllLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTests: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await ApiAxios.get("/pengujian");
        const allLogs = response.data;
        setLogs(allLogs);

        // Calculate stats
        const totalTests = allLogs.length;
        const passed = allLogs.filter(
          (log) => log.statusPengujian.toLowerCase() === "lolos"
        ).length;
        const failed = totalTests - passed;
        const passRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;

        setStats({
          totalTests,
          passed,
          failed,
          passRate: passRate.toFixed(2),
        });

        setError(null);
      } catch (err) {
        setError(
          "Gagal memuat data dari server. Pastikan server back-end berjalan."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []); // Runs once on component mount

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const getStatusClass = (status) => {
    if (status.toLowerCase() === "lolos") return "bg-success";
    if (status.toLowerCase() === "gagal") return "bg-danger";
    return "bg-warning";
  };

  const filteredLogs = logs
    .filter((log) => {
      if (filterStatus === "semua") return true;
      // Ensure case-insensitive comparison
      return log.statusPengujian.toLowerCase() === filterStatus;
    })
    .filter((log) => {
      // Fallback for missing noSeriWm
      return (log.noSeriWm || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

  return (
    <>
      <Header stats={stats} />
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
                          placeholder="Cari No Seri WM"
                          type="text"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4" className="text-right">
                    <ButtonGroup>
                      <Button
                        color="primary"
                        onClick={() => handleFilterChange("semua")}
                        active={filterStatus === "semua"}
                      >
                        Semua
                      </Button>
                      <Button
                        color="success"
                        onClick={() => handleFilterChange("lolos")}
                        active={filterStatus === "lolos"}
                      >
                        Lolos
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleFilterChange("gagal")}
                        active={filterStatus === "gagal"}
                      >
                        Gagal
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Waktu Uji</th>
                    <th scope="col">No Seri WM</th>
                    <th scope="col">Merek WM</th>
                    <th scope="col">Stand Awal (m³)</th>
                    <th scope="col">Stand Akhir (m³)</th>
                    <th scope="col">Durasi (s)</th>
                    <th scope="col">Teknisi</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        <Spinner color="primary" />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="8" className="text-center text-danger">
                        {error}
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          {new Date(log.createdAt).toLocaleString("id-ID")}
                        </td>
                        <td>{log.noSeriWm}</td>
                        <td>{log.merekWm}</td>
                        <td>{log.standMeterAwal}</td>
                        <td>{log.standMeterAkhir}</td>
                        <td>{log.durasiPengujian}</td>
                        <td>{log.idPengguna}</td>
                        <td>
                          <span className="badge badge-dot mr-4">
                            <i
                              className={getStatusClass(log.statusPengujian)}
                            />
                            {log.statusPengujian}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* Pagination logic can be added here later */}
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
};

export default AllLogs;
