# HealthChain Hackathon Demo Architecture

This architecture is tuned for a **stable demo**, clean code boundaries, and a visible AI differentiator while keeping operational overhead low.

## 1) Microservices Design (Practical for demo)

We keep the current MERN codebase but shape it as modular services behind an API layer:

- **Auth Service (Express module)**
  - JWT login
  - role identity (`patient`, `doctor`, `pharmacy`)
- **Clinical API Service (Express module)**
  - patient profile aggregation
  - doctor workflows (patients + prescriptions)
  - pharmacy prescription status updates
- **AI Service (Express module)**
  - `/api/ai/risk-prediction`
  - explainable output (risk score, risk band, factors)

For demo day, these modules run in one backend process for simplicity, but route separation enables easy extraction later.

## 2) Security Model

- **Authentication**: JWT bearer token middleware
- **Authorization**: RBAC middleware with explicit role gates:
  - patient endpoints -> `patient`
  - doctor endpoints -> `doctor`
  - prescription status updates -> `doctor` or `pharmacy`
  - AI endpoint -> `doctor` or `patient`
- **Validation**: `express-validator` request validation + unified 422 validation responses
- **Centralized Error Handling**:
  - route-level async error forwarding
  - global not-found + error middleware
  - consistent API error shape

## 3) AI Pipeline (Demo-first)

### Inference endpoint
`POST /api/ai/risk-prediction`

### Current model
A deterministic mock model (rule-based), intentionally transparent for judging:
- age risk contribution
- chronic condition history contribution
- allergy complexity contribution
- visit frequency contribution

### Explainability
Response includes:
- `riskScore` (0-1)
- `riskBand` (`LOW|MEDIUM|HIGH`)
- `factors[]` with per-factor impact
- model metadata (`name`, `version`, `type`)

## 4) Scalability Vision (Not overengineered)

- Stateless API containers
- MongoDB as primary store
- Optional Redis cache (next step)
- Kubernetes deployment with one demonstrable **HPA** (`patient-service-hpa`) to show autoscaling capability
- CI baseline with test/build steps for confidence

## 5) Consistent API Contract

All successful APIs return:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

All failures return:

```json
{
  "success": false,
  "message": "...",
  "details": []
}
```

This keeps frontend integration predictable and fast during the hackathon.
