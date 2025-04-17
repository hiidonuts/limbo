let subjects = [];

// Function to open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
    
    if (modalId === 'uploadModal') {
        updateSubjectSelect();
    }
}

// Function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function createSubjectFolder() {
    const folderName = document.getElementById('folderName').value.trim();
    
    if (folderName) {
        const subject = {
            name: folderName,
            files: []
        };
        
        subjects.push(subject);
        updateSubjectsList();
        closeModal('createFolderModal');
        document.getElementById('folderName').value = '';
    }
}

function updateSubjectSelect() {
    const select = document.getElementById('subjectSelect');
    select.innerHTML = '';
    
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        option.textContent = subject.name;
        select.appendChild(option);
    });
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const subjectSelect = document.getElementById('subjectSelect');
    
    if (fileInput.files.length > 0 && subjectSelect.value) {
        const file = fileInput.files[0];
        const subject = subjects.find(s => s.name === subjectSelect.value);
        
        if (subject) {
            subject.files.push({
                name: file.name,
                size: file.size,
                type: file.type,
                uploadDate: new Date().toLocaleString()
            });
            
            updateSubjectsList();
            closeModal('uploadModal');
            fileInput.value = '';
        }
    }
}

function updateSubjectsList() {
    const subjectsList = document.getElementById('subjectsList');
    subjectsList.innerHTML = '';
    
    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.className = 'subject-folder';
        
        const header = document.createElement('h3');
        header.textContent = subject.name;
        subjectElement.appendChild(header);
        
        if (subject.files.length > 0) {
            const filesList = document.createElement('ul');
            filesList.className = 'files-list';
            
            subject.files.forEach(file => {
                const fileItem = document.createElement('li');
                fileItem.textContent = `${file.name} (${formatFileSize(file.size)})`;
                filesList.appendChild(fileItem);
            });
            
            subjectElement.appendChild(filesList);
        }
        
        subjectsList.appendChild(subjectElement);
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
};

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

setInterval(updateClock, 1000);
updateClock();