"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { type ApexOptions, Chart as ApexChart } from "apexcharts"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getQuoteRequests } from "@/lib/api/quote-requests"
import { getCustomers } from "@/lib/api/customers"
import { getServices } from "@/lib/api/services"
import { getOptions } from "@/lib/api/options"
import { getUsers } from "@/lib/api/users"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { logActivity } from "@/lib/api/activity-logs"
import { MdOutlineFileDownload } from "react-icons/md"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

ApexChart.registerLocale("en", {
  name: "en",
  options: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
})

const DashboardPage = () => {
  const toast = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("All")
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: "ascending" | "descending"
  }>({ key: null, direction: "ascending" })

  const [quoteRequests, setQuoteRequests] = useState([])
  const [recentActivity, setRecentActivity] = useState([])

  const {
    data: quoteRequestsData,
    isLoading: isLoadingQuoteRequests,
    isError: isErrorQuoteRequests,
  } = useQuery({
    queryKey: ["quoteRequests"],
    queryFn: () => getQuoteRequests(),
    onSuccess: (data) => {
      setQuoteRequests(data)
    },
    onError: (error) => {
      toast({
        title: "Error fetching quote requests",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    },
  })

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const data = await getQuoteRequests() // Assuming this returns all quote requests
        setRecentActivity(data.slice(-5).reverse()) // Get last 5 and reverse for recent
      } catch (error) {
        console.error("Failed to fetch recent activity:", error)
      }
    }

    fetchRecentActivity()
  }, [quoteRequestsData])

  const {
    data: customers,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    onError: (error) => {
      toast({
        title: "Error fetching customers",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    },
  })

  const {
    data: services,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(),
    onError: (error) => {
      toast({
        title: "Error fetching services",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    },
  })

  const {
    data: options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useQuery({
    queryKey: ["options"],
    queryFn: () => getOptions(),
    onError: (error) => {
      toast({
        title: "Error fetching options",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    },
  })

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    onError: (error) => {
      toast({
        title: "Error fetching users",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    },
  })

  const filteredAndSortedRequests = useMemo(() => {
    // First filter the requests
    const filtered = quoteRequests.filter((request) => {
      const matchesSearch =
        (request.customer_name || request.customer?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.customer_email || request.customer?.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.customer_postcode || request.customer?.address?.postcode || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "All" || request.status === statusFilter
      const matchesService =
        serviceFilter === "All" || (request.service_type || request.service || "").includes(serviceFilter)

      return matchesSearch && matchesStatus && matchesService
    })

    // Then sort the filtered requests
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue

        // Handle nested properties
        if (sortConfig.key === "customer_name") {
          aValue = a.customer_name || a.customer?.name || ""
          bValue = b.customer_name || b.customer?.name || ""
        } else {
          aValue = a[sortConfig.key as keyof typeof a]
          bValue = b[sortConfig.key as keyof typeof b]
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [quoteRequests, searchTerm, statusFilter, serviceFilter, sortConfig])

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilterChange = (e: any) => {
    setStatusFilter(e.target.value)
  }

  const handleServiceFilterChange = (e: any) => {
    setServiceFilter(e.target.value)
  }

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const chartOptions: ApexOptions = useMemo(() => {
    const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data = Array(12).fill(0) // Initialize with 0

    if (quoteRequestsData) {
      quoteRequestsData.forEach((request) => {
        const date = new Date(request.date || request.created_at)
        const month = date.getMonth() // 0-indexed
        data[month]++ // Increment count for that month
      })
    }

    return {
      chart: {
        id: "quotes-per-month",
        locales: [
          {
            name: "en",
            options: {
              months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            },
          },
        ],
        defaultLocale: "en",
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: "Number of Quotes",
        },
      },
      series: [
        {
          name: "Quotes",
          data: data,
        },
      ],
      noData: {
        text: "No data available.",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#8e8e8e",
          fontSize: "16px",
          fontFamily: undefined,
        },
      },
    }
  }, [quoteRequestsData])

  const exportQuoteCSV = useCallback(
    (quote: any) => {
      const headers = [
        "Quote ID",
        "Date",
        "Customer Name",
        "Email",
        "Phone",
        "Address",
        "Service",
        "Type",
        "Option",
        "Price",
        "Status",
      ]

      const data = [
        quote.id,
        new Date(quote.date || quote.created_at).toLocaleDateString("en-UK", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        quote.customer?.name || quote.customer_name,
        quote.customer?.email || quote.customer_email,
        quote.customer?.phone || quote.customer_phone,
        `${quote.customer?.address?.line1 || quote.customer_address_line1}, ${quote.customer?.address?.city || quote.customer_city}, ${quote.customer?.address?.postcode || quote.customer_postcode}`,
        quote.service || quote.service_type,
        quote.type || quote.type_id,
        quote.option || quote.option_id,
        quote.price,
        quote.status,
      ]

      const csvContent = [headers.join(","), data.join(",")].join("\n")
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `quote_${quote.id}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Log activity
      logActivity(`Exported quote ${quote.id} to CSV`)
    },
    [logActivity],
  )

  if (isLoadingQuoteRequests || isLoadingCustomers || isLoadingServices || isLoadingOptions || isLoadingUsers) {
    return (
      <Center h="100vh">
        <Text>Loading...</Text>
      </Center>
    )
  }

  if (isErrorQuoteRequests || isErrorCustomers || isErrorServices || isErrorOptions || isErrorUsers) {
    return (
      <Center h="100vh">
        <Text>Error loading data.</Text>
      </Center>
    )
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Dashboard
      </Heading>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={5} mb={5}>
        <Card>
          <CardBody>
            <Stack>
              <Heading as="h2" size="md">
                Total Quotes
              </Heading>
              <Text fontSize="xl">{quoteRequestsData?.length || 0}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Heading as="h2" size="md">
                Total Customers
              </Heading>
              <Text fontSize="xl">{customers?.length || 0}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Heading as="h2" size="md">
                Total Services
              </Heading>
              <Text fontSize="xl">{services?.length || 0}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Heading as="h2" size="md">
                Total Options
              </Heading>
              <Text fontSize="xl">{options?.length || 0}</Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Grid templateColumns="repeat(12, 1fr)" gap={5}>
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Card>
            <CardBody>
              <Heading as="h2" size="md" mb={4}>
                Quotes per Month
              </Heading>
              <Chart options={chartOptions} series={chartOptions.series} type="bar" height={350} />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Card>
            <CardBody>
              <Heading as="h2" size="md" mb={4}>
                Recent Activity
              </Heading>
              <Stack divider={<hr />} spacing={4}>
                {recentActivity.map((quote) => (
                  <Box key={quote.id}>
                    <Heading size="xs" textTransform="uppercase">
                      Quote ID: {quote.id}
                    </Heading>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(quote.date || quote.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {quote.customer_name || quote.customer?.name} - {quote.service || quote.service_type}
                    </p>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Card mt={5}>
        <CardBody>
          <Heading as="h2" size="md" mb={4}>
            Quote Requests
          </Heading>

          <Flex mb={4} justify="space-between">
            <Input placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />

            <Flex gap={2}>
              <Select placeholder="Filter by Status" value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </Select>

              <Select placeholder="Filter by Service" value={serviceFilter} onChange={handleServiceFilterChange}>
                <option value="All">All</option>
                {services?.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th onClick={() => requestSort("id")} cursor="pointer">
                  Quote ID
                </Th>
                <Th onClick={() => requestSort("date")} cursor="pointer">
                  Date
                </Th>
                <Th onClick={() => requestSort("customer_name")} cursor="pointer">
                  Customer Name
                </Th>
                <Th>Email</Th>
                <Th>Service</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAndSortedRequests.map((quote) => (
                <Tr key={quote.id}>
                  <Td>{quote.id}</Td>
                  <Td>{new Date(quote.date || quote.created_at).toLocaleDateString()}</Td>
                  <Td>{quote.customer_name || quote.customer?.name}</Td>
                  <Td>{quote.customer_email || quote.customer?.email}</Td>
                  <Td>{quote.service || quote.service_type}</Td>
                  <Td>{quote.status}</Td>
                  <Td>
                    <Button size="sm" onClick={() => exportQuoteCSV(quote)}>
                      <MdOutlineFileDownload />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  )
}

export default DashboardPage
