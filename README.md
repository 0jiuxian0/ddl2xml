# SQL to XML Converter

A web application that converts SQL DDL statements to MyBatis XML mappings for batch operations.

## Features

- Convert SQL CREATE TABLE statements to MyBatis batch insert XML
- Convert SQL CREATE TABLE statements to MyBatis batch update XML
- Support for various SQL data types with JDBC type mapping
- Modern React frontend with Tailwind CSS
- Flask backend with CORS support

## Project Structure

```
.
├── frontend/                # React frontend
│   ├── src/                
│   │   ├── api/            # API integration
│   │   ├── components/     # React components
│   │   └── config.ts       # Configuration
│   └── package.json        
├── backend/                # Flask backend
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── views/             # API endpoints
│   ├── app.py            # Main application
│   └── requirements.txt   # Python dependencies
└── README.md
```

## Development

### Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment

- Backend: Deployed on Render
- Frontend: Deployed on Netlify

## License

MIT