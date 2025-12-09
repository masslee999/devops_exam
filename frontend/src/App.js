import React, { useState, useEffect } from 'react';
import EtudiantModal from './components/EtudiantModal';
import EtudiantCard from './components/EtudiantCard';
import { etudiantService } from './services/etudiantService';
import './styles/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [etudiants, setEtudiants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEtudiant, setEditingEtudiant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEtudiants();
  }, []);

  const loadEtudiants = async () => {
    setLoading(true);
    try {
      const data = await etudiantService.getAllEtudiants();
      setEtudiants(data);
    } catch (error) {
      console.error('Error loading etudiants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEtudiant = async (etudiantData) => {
    try {
      await etudiantService.createEtudiant(etudiantData);
      await loadEtudiants();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating etudiant:', error);
    }
  };

  const handleUpdateEtudiant = async (etudiantData) => {
    try {
      await etudiantService.updateEtudiant(editingEtudiant.id, etudiantData);
      await loadEtudiants();
      setIsModalOpen(false);
      setEditingEtudiant(null);
    } catch (error) {
      console.error('Error updating etudiant:', error);
    }
  };

  const handleDeleteEtudiant = async (etudiantId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      try {
        await etudiantService.deleteEtudiant(etudiantId);
        await loadEtudiants();
      } catch (error) {
        console.error('Error deleting etudiant:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingEtudiant(null);
    setIsModalOpen(true);
  };

  const openEditModal = (etudiant) => {
    setEditingEtudiant(etudiant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEtudiant(null);
  };

  // 🔹 Filtrage sécurisé pour nom, prenom, email et numCarte
  const filteredEtudiants = etudiants.filter(etudiant => {
    const fullName = `${etudiant.nom || ''} ${etudiant.prenom || ''}`.toLowerCase();
    const email = (etudiant.email || '').toLowerCase();
    const numCarte = (etudiant.numCarte || '').toLowerCase();
    const term = searchTerm.toLowerCase();

    return fullName.includes(term) || email.includes(term) || numCarte.includes(term);
  });

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">
            <i className="fas fa-user-graduate"></i>
            Gestion des Étudiants
          </h1>
          <p className="app-subtitle">Application CRUD moderne et responsive</p>
        </header>

        {/* Controls */}
        <div className="controls">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={openCreateModal}
          >
            <i className="fas fa-plus"></i>
            Nouvel Étudiant
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des étudiants...</p>
          </div>
        )}

        {/* Étudiants Grid */}
        <div className="etudiants-grid">
          {filteredEtudiants.map(etudiant => (
            <EtudiantCard
              key={etudiant.id}
              etudiant={etudiant}
              onEdit={openEditModal}
              onDelete={handleDeleteEtudiant}
            />
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredEtudiants.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-user-slash"></i>
            <h3>Aucun utilisateur trouvé</h3>
            <p>
              {searchTerm 
                ? "Aucun étudiant ne correspond à votre recherche"
                : "Commencez par ajouter un nouvel étudiant"
              }
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <EtudiantModal
            etudiant={editingEtudiant}
            onSave={editingEtudiant ? handleUpdateEtudiant : handleCreateEtudiant}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
