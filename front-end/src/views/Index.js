import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ApiAxios from "network/ApiAxios";

const Index = () => {
  const [stats, setStats] = useState({
    totalTests: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
    recentTests: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize with a valid but empty structure
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        ...chartExample1.data.datasets[0],
        data: [],
      },
    ],
  });
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    datasets: [
      {
        ...chartExample2.data.datasets[0],
        data: [],
      },
    ],
  });

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await ApiAxios.get("/pengujian/stats");
        const data = response.data;
        setStats(data);

        // --- LOGIKA BARU UNTUK GRAFIK GARIS ---
        if (data.recentTests && data.recentTests.length > 0) {
          const firstDate = new Date(data.recentTests[0].createdAt)
            .toISOString()
            .split("T")[0];
          const allSameDay = data.recentTests.every(
            (test) =>
              new Date(test.createdAt).toISOString().split("T")[0] === firstDate
          );

          let labels;
          let dataPoints;

          if (allSameDay && data.recentTests.length > 1) {
            // Jika semua data di hari yang sama, kelompokkan per jam:menit
            const testsByTime = data.recentTests.reduce((acc, test) => {
              const time = new Date(test.createdAt).toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              acc[time] = (acc[time] || 0) + 1;
              return acc;
            }, {});
            labels = Object.keys(testsByTime).reverse();
            dataPoints = Object.values(testsByTime).reverse();
          } else {
            // Jika data dari hari berbeda, kelompokkan per hari
            const testsByDay = data.recentTests.reduce((acc, test) => {
              const date = new Date(test.createdAt).toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "short" }
              );
              acc[date] = (acc[date] || 0) + 1;
              return acc;
            }, {});
            labels = Object.keys(testsByDay).reverse();
            dataPoints = Object.values(testsByDay).reverse();
          }

          // --- LOGIKA BARU: Membuat data kumulatif ---
          const cumulativeData = dataPoints.reduce((acc, val) => {
            const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
            acc.push(lastValue + val);
            return acc;
          }, []);
          // --- AKHIR LOGIKA KUMULATIF ---

          setLineChartData({
            labels: labels,
            datasets: [
              {
                ...chartExample1.data.datasets[0],
                data: cumulativeData, // Menggunakan data kumulatif
              },
            ],
          });
        }
        // --- AKHIR LOGIKA BARU ---

        // Build Doughnut Chart data from scratch
        setDoughnutChartData({
          labels: ["Lolos", "Gagal"],
          datasets: [
            {
              ...chartExample2.data.datasets[0],
              data: [data.passed, data.failed],
            },
          ],
        });

        setError(null);
      } catch (err) {
        setError("Gagal memuat data statistik.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getStatusClass = (status) => {
    if (status === "Lolos") return "text-success";
    if (status === "Tidak Lolos") return "text-danger";
    return "text-warning";
  };

  return (
    <>
      <Header stats={stats} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {loading ? (
          <Row className="justify-content-center">
            <Spinner color="primary" />
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col xs="12" className="text-center text-danger">
              <p>{error}</p>
              <p>Pastikan server back-end berjalan dan dapat diakses.</p>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="mb-0">Total Pengujian Harian</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="chart">
                      <Line
                        data={lineChartData}
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
                    <div className="chart">
                      <Doughnut
                        data={doughnutChartData}
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
                        <th scope="col">No Seri WM</th>
                        <th scope="col">ID Alat</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentTests.slice(0, 5).map(
                        (
                          test // Show only top 5
                        ) => (
                          <tr key={test.id}>
                            <th scope="row">
                              {new Date(test.createdAt).toLocaleString("id-ID")}
                            </th>
                            <td>{test.noSeriWm}</td>
                            <td>{test.idAlat}</td>
                            <td>
                              <i
                                className={`fas fa-circle ${getStatusClass(
                                  test.statusPengujian
                                )} mr-3`}
                              />
                              {test.statusPengujian}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
