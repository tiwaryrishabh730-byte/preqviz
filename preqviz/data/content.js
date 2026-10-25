// Preqviz 2.0 — display content.
// Everything the page shows in words: names, subjects, explanations.
// The graph itself (who needs what) lives in edges.txt, and its results come from the C program (results.js).
// Edit freely: nothing here affects the graph.

window.PREQVIZ_CONTENT = {
  subjects: {
    calc: { name: 'Calculus', semester: 1, short: 'Calculus · Sem 1', tickable: true },
    py: { name: 'Programming in Python', semester: 2, short: 'Python · Sem 2', tickable: true },
    ps: { name: 'Probability and Statistics', semester: 3, short: 'Probability · Sem 3', tickable: true },
    dsa: { name: 'Data Structures and Algorithms', semester: 3, short: 'Data Structures · Sem 3', tickable: true },
    dm: { name: 'Discrete Mathematics', semester: 3, short: 'Discrete Maths · Sem 3', tickable: true },
    os: { name: 'Operating Systems', semester: 3, short: 'Operating Systems · Sem 3', tickable: true },
    ca: { name: 'Computer Architecture', semester: 3, short: 'Architecture · Sem 3', tickable: true },
    ml: { name: 'Machine Learning', semester: 0, short: 'Machine Learning', tickable: true },
    cn: { name: 'Computer Networks', semester: 0, short: 'Computer Networks', tickable: true },
    phy: { name: 'Engineering Physics', semester: 0, short: 'Physics', tickable: false },
    ctrl: { name: 'Control Systems', semester: 0, short: 'Control Systems', tickable: false },
    ece: { name: 'Electronics', semester: 0, short: 'Electronics', tickable: false },
    gfx: { name: 'Computer Graphics', semester: 0, short: 'Computer Graphics', tickable: false },
    db: { name: 'Database Systems', semester: 0, short: 'Database Systems', tickable: false },
    cad: { name: 'Computer-Aided Design', semester: 0, short: 'Computer-Aided Design', tickable: false }
  },

  welcomeGroups: [
    { label: 'Semester 1', subjects: ['calc'] },
    { label: 'Semester 2', subjects: ['py'] },
    { label: 'Semester 3', subjects: ['ps', 'dsa', 'dm', 'os', 'ca'] },
    { label: 'Studied on your own', subjects: ['ml', 'cn'] }
  ],

  defaultDone: ['calc', 'py', 'ps', 'dsa', 'dm', 'os', 'ca'],

  // Shown first in the open-elective list; the rest follow alphabetically.
  featuredOpen: ['virtual_augmented_reality', 'drone_technology', 'game_design', 'geographic_information_systems'],

  topics: {
    numpy_arrays: { label: 'NumPy arrays', subject: 'py' },
    arrays_loops: { label: 'Arrays and loops', subject: 'py' },
    basic_probability: { label: 'Basic probability', subject: 'ps' },
    probability_distributions: { label: 'Probability distributions', subject: 'ps' },
    trees: { label: 'Trees', subject: 'dsa' },
    recursion: { label: 'Recursion', subject: 'py' },
    weighted_graphs: { label: 'Weighted graphs', subject: 'dsa' },
    combinatorics: { label: 'Combinatorics', subject: 'dm' },
    vectors: { label: 'Vectors', subject: 'calc', revise: true },
    local_global_optima: { label: 'Local and global optima', subject: 'calc' },
    derivatives: { label: 'Derivatives', subject: 'calc' },
    binary_numbers: { label: 'Binary numbers', subject: 'ca' },
    command_line: { label: 'Command line basics', subject: 'os' },
    array_indexing: { label: '2D array indexing', subject: 'dsa' },
    parallelism_threads: { label: 'Parallelism and threads', subject: 'os' },
    race_conditions: { label: 'Race conditions', subject: 'os' },
    memory_hierarchy: { label: 'Memory hierarchy', subject: 'ca' },
    cache_memory: { label: 'Cache memory', subject: 'ca' },
    matrix_multiplication: { label: 'Matrix multiplication', subject: 'calc', revise: true },
    dot_product: { label: 'Dot product', subject: 'calc', revise: true },
    neural_network_basics: { label: 'Neural network basics', subject: 'ml' },
    public_private_keys: { label: 'Public and private keys', subject: 'cn' },
    logarithms: { label: 'Logarithms', subject: 'calc' },
    conditional_probability: { label: 'Conditional probability', subject: 'ps' },
    convex_functions: { label: 'Convex functions', subject: 'calc' },
    second_derivatives: { label: 'Second derivatives', subject: 'calc' },
    gaussian_distribution: { label: 'Gaussian distribution', subject: 'ps' },
    integration: { label: 'Integration', subject: 'calc' },
    law_of_large_numbers: { label: 'Law of large numbers', subject: 'ps' },
    expectation: { label: 'Expectation', subject: 'ps' },
    random_variables: { label: 'Random variables', subject: 'ps' },
    hypothesis_testing: { label: 'Hypothesis testing', subject: 'ps' },
    bayes_theorem: { label: 'Bayes’ theorem', subject: 'ps' },
    vectors_matrices: { label: 'Vectors and matrices', subject: 'calc', revise: true },
    classification_loss: { label: 'Classification and loss', subject: 'ml' },
    programming_basics: { label: 'Programming basics', subject: 'py' },
    flight_physics: { label: 'Flight physics', subject: 'phy' },
    control_systems_basics: { label: 'Control systems basics', subject: 'ctrl' },
    sensors_electronics: { label: 'Sensors and electronics', subject: 'ece' },
    networking_basics: { label: 'Networking basics', subject: 'cn' },
    descriptive_statistics: { label: 'Descriptive statistics', subject: 'ps' },
    coordinate_systems: { label: 'Coordinate systems', subject: 'calc' },
    databases_tables: { label: 'Databases and tables', subject: 'db' },
    spatial_data_structures: { label: 'Spatial data structures', subject: 'dsa' },
    modelling_3d: { label: '3D modelling basics', subject: 'cad' },
    energy_power_basics: { label: 'Energy and power basics', subject: 'phy' },
    electrical_circuits: { label: 'Electrical circuits', subject: 'ece' },
    transformations_3d: { label: '3D transformations', subject: 'calc', revise: true },
    graphics_basics: { label: 'Graphics basics', subject: 'gfx' },
    classes_objects: { label: 'Classes and objects', subject: 'py' },
    data_structures: { label: 'Data structures', subject: 'dsa' },
    vectors_motion: { label: 'Vectors and motion', subject: 'calc', revise: true }
  },

  // why: [why it is needed, used in]
  electives: {
    nature_inspired_algorithms: {
      name: 'Nature Inspired Algorithms', short: 'Nature Inspired', type: 'program', dept: 'Artificial Intelligence',
      credits: 2, hours: '1 lecture + 2 practical hours a week',
      desc: 'Evolutionary computation, ant colony and particle swarm optimisation. The syllabus lists only a programming course, but the units lean on probability, data structures and vectors too.',
      why: {
        arrays_loops: ['Every algorithm is implemented in the lab; populations of solutions are arrays processed in loops.', 'All laboratory work'],
        basic_probability: ['Mutation, crossover and selection are all random choices.', 'Units 2, 3, 5 and 6'],
        probability_distributions: ['Gaussian mutation in evolution strategies and random initialisation.', 'Units 2 and 4'],
        trees: ['Tree representation is the basis of genetic programming.', 'Units 2 and 4'],
        recursion: ['Trees are built, mutated and evaluated recursively.', 'Unit 4'],
        weighted_graphs: ['Ant colony optimisation builds paths across a weighted graph.', 'Unit 5'],
        combinatorics: ['Permutation representation and the 8 queens problem.', 'Units 1 and 2'],
        vectors: ['Particle swarm optimisation updates position and velocity vectors.', 'Unit 6'],
        local_global_optima: ['Fitness landscapes, multimodal problems and convergence.', 'Units 3, 5 and 6'],
        derivatives: ['Optima are first met in calculus as maxima and minima found with derivatives. The algorithms themselves need no gradients.', 'Unit 3'],
        binary_numbers: ['Binary representation and bit-flip mutation.', 'Unit 2']
      }
    },
    git_cuda_programming: {
      name: 'Git and CUDA Programming', short: 'Git and CUDA', type: 'program', dept: 'Artificial Intelligence',
      credits: 2, hours: '1 lecture + 2 practical hours a week',
      desc: 'Version control with Git, then programming graphics processors from Python. Assessed internally, with no term-end exam. The syllabus lists Python Programming; the CUDA half also leans on computer architecture and matrices.',
      why: {
        command_line: ['Git is used from the terminal.', 'Units 1 and 2'],
        numpy_arrays: ['CuPy mirrors NumPy, and data moves to the graphics processor as arrays.', 'Units 4 and 5'],
        arrays_loops: ['Kernels replace loops over arrays, so you need to know the loop first.', 'Units 3 and 4'],
        array_indexing: ['Each thread works out its own index from block and thread numbers.', 'Units 3 and 4'],
        parallelism_threads: ['Kernels run as thousands of threads organised in blocks and grids.', 'Units 3 and 5'],
        race_conditions: ['Thread synchronisation when optimising kernels.', 'Unit 5'],
        memory_hierarchy: ['Global, shared and local memory decide how fast a kernel runs.', 'Units 4 and 5'],
        cache_memory: ['Shared memory behaves like a cache you manage yourself.', 'Unit 5'],
        matrix_multiplication: ['The main hands-on exercise in Unit 4.', 'Unit 4'],
        dot_product: ['Each cell of a matrix product is one dot product.', 'Unit 4'],
        vectors: ['The first CUDA program is vector addition.', 'Unit 3'],
        neural_network_basics: ['Accelerating neural network operations in Unit 5.', 'Unit 5'],
        public_private_keys: ['Setting up Secure Shell keys for GitHub.', 'Unit 1']
      }
    },
    information_theory: {
      name: 'Foundations of Information Theory for AI', short: 'Information Theory', type: 'program', dept: 'Artificial Intelligence',
      credits: 2, hours: '1 lecture + 2 practical hours a week',
      desc: 'Entropy, divergence and the information limits of learning systems. The syllabus lists Linear Algebra, Calculus and Probability; Preqviz breaks those into the topics the units actually use.',
      why: {
        logarithms: ['Entropy, log-loss and the log-sum inequality are all built from logarithms.', 'Units 1 to 3'],
        conditional_probability: ['Joint and conditional entropy and mutual information are defined with it.', 'Units 1 and 3'],
        basic_probability: ['Information content is defined from the probability of an outcome.', 'Unit 1'],
        convex_functions: ['Kullback–Leibler divergence is convex, and Jensen’s inequality rests on convexity.', 'Unit 2'],
        second_derivatives: ['The quickest test of whether a function is convex.', 'Unit 2'],
        derivatives: ['Second derivatives build on first derivatives.', 'Unit 2'],
        gaussian_distribution: ['Entropy of Gaussian variables and variational autoencoders rely on it.', 'Units 1 and 2'],
        integration: ['Entropy and expectation for continuous variables are integrals.', 'Unit 1'],
        law_of_large_numbers: ['It is the idea behind the Asymptotic Equipartition Property.', 'Unit 3'],
        expectation: ['Entropy is the expected surprise of an outcome.', 'Unit 1'],
        random_variables: ['Every information measure is defined over random variables.', 'Units 1 to 3'],
        vectors_matrices: ['Needed for multivariate Gaussians and neural representations.', 'Units 1 and 3'],
        classification_loss: ['Cross-entropy loss and Fano’s error bound assume you know classifiers.', 'Units 1 and 3'],
        hypothesis_testing: ['Log-likelihood ratio tests and multiple hypothesis testing extend it.', 'Unit 2'],
        bayes_theorem: ['Bayesian learning, and the link between divergence and regularisation, use it.', 'Unit 2']
      }
    },

    virtual_augmented_reality: {
      name: 'Introduction to Virtual Reality and Augmented Reality', short: 'Virtual and Augmented Reality', type: 'open', dept: 'Mechatronics',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'A self-contained, practice-oriented course on designing virtual and augmented reality products.',
      why: {
        transformations_3d: ['Moving and rotating objects in a 3D scene is matrix work.', 'Estimated from the course description'],
        programming_basics: ['Products are built in code inside a game engine.', 'Estimated from the course description'],
        graphics_basics: ['How 3D scenes are drawn on screen.', 'Estimated from the course description']
      }
    },
    drone_technology: {
      name: 'Drone Technology', short: 'Drone Technology', type: 'open', dept: 'Electronics and Telecommunication',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'How drones are made and controlled: manufacturing, trajectory control, and their software and hardware.',
      why: {
        programming_basics: ['Flight software and trajectory scripts.', 'Estimated from the course description'],
        flight_physics: ['Lift, thrust and stability decide how a drone flies.', 'Estimated from the course description'],
        control_systems_basics: ['Trajectory control keeps the drone on course.', 'Estimated from the course description'],
        sensors_electronics: ['The hardware side of drones.', 'Estimated from the course description']
      }
    },
    game_design: {
      name: 'Game Design', short: 'Game Design', type: 'open', dept: 'Information Technology',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Trends in the games industry and the software tools used to design computer games.',
      why: {
        classes_objects: ['Game characters and items are modelled as objects.', 'Estimated from the course description'],
        data_structures: ['Game state, levels and inventories live in data structures.', 'Estimated from the course description'],
        vectors_motion: ['Movement and collisions are vector maths.', 'Estimated from the course description']
      }
    },
    geographic_information_systems: {
      name: 'Introduction to Geographic Information Systems', short: 'Geographic Information Systems', type: 'open', dept: 'Civil Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Mapping and spatial analysis with geo-tagged data, using tools such as ArcGIS and QGIS.',
      why: {
        coordinate_systems: ['Every data set is placed on a map by its coordinates.', 'Estimated from the course description'],
        databases_tables: ['Geographic data is stored and queried in databases.', 'Estimated from the course description'],
        descriptive_statistics: ['Summarising spatial data before analysing it.', 'Estimated from the course description'],
        spatial_data_structures: ['Finding nearby features quickly.', 'Estimated from the course description']
      }
    },
    three_d_printing: {
      name: '3D Printing', short: '3D Printing', type: 'open', dept: 'Mechanical Engineering',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'How 3D printing went from prototypes to finished parts, and where it is used today.',
      why: { modelling_3d: ['Parts are designed as 3D models before printing.', 'Estimated from the course description'] }
    },
    five_g_for_everyone: {
      name: '5G for Everyone', short: '5G for Everyone', type: 'open', dept: 'Electronics and Telecommunication',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'What 5G is and how it changes work and business. The course states that no prior knowledge of wireless technology is needed.',
      why: {}
    },
    climate_change: {
      name: 'Fundamentals of Climate Change', short: 'Climate Change', type: 'open', dept: 'Civil Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Causes of global warming and possible remedies, at an intermediate level.',
      why: {}
    },
    disaster_management: {
      name: 'Disaster Management', short: 'Disaster Management', type: 'open', dept: 'Civil Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'How relief and services are mobilised before and after natural disasters and epidemics.',
      why: {}
    },
    electric_vehicle_technology: {
      name: 'Electric Vehicle Technology', short: 'Electric Vehicles', type: 'open', dept: 'Mechanical Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Batteries, fuel cells, autonomous driving and sustainable transport.',
      why: {
        energy_power_basics: ['Battery and efficiency comparisons need energy basics.', 'Estimated from the course description'],
        electrical_circuits: ['Electric drivetrains are electrical systems.', 'Estimated from the course description']
      }
    },
    elements_of_automation: {
      name: 'Elements of Automation', short: 'Elements of Automation', type: 'open', dept: 'Mechatronics',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'Industrial automation in hands-on labs: software, computers, fluid power and mechanisms.',
      why: {
        programming_basics: ['Automation systems are driven by software.', 'Estimated from the course description'],
        electrical_circuits: ['Hardware is wired to the controlling computers.', 'Estimated from the course description']
      }
    },
    engineering_materials: {
      name: 'Engineering Materials for Daily Life', short: 'Engineering Materials', type: 'open', dept: 'Mechanical Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'The practical logic behind the materials in everyday products, explained without heavy formulas.',
      why: {}
    },
    industrial_ergonomics: {
      name: 'Industrial Ergonomics', short: 'Industrial Ergonomics', type: 'open', dept: 'Mechanical Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Designing safe, comfortable and efficient workplaces around human capabilities.',
      why: { descriptive_statistics: ['Body measurements for design are summarised statistically.', 'Estimated from the course description'] }
    },
    interior_design: {
      name: 'Interior Design', short: 'Interior Design', type: 'open', dept: 'Civil Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Designing personal living and work spaces, as a practical life skill.',
      why: {}
    },
    renewable_energy_sources: {
      name: 'Renewable Energy Sources', short: 'Renewable Energy', type: 'open', dept: 'Mechanical Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'The energy scenario, non-conventional energy sources and how to tap them.',
      why: { energy_power_basics: ['Comparing energy sources needs energy and power basics.', 'Estimated from the course description'] }
    },
    research_methodology: {
      name: 'Research Methodology', short: 'Research Methodology', type: 'open', dept: 'Civil Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'How modern research is planned and carried out, for students aiming at research and development.',
      why: { descriptive_statistics: ['Research results are analysed and reported statistically.', 'Estimated from the course description'] }
    },
    smart_cities: {
      name: 'Smart Cities', short: 'Smart Cities', type: 'open', dept: 'Civil Engineering',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Technologies and data used in smart city projects, including India’s Smart Cities Mission.',
      why: {
        descriptive_statistics: ['Smart city decisions rely on data analytics.', 'Estimated from the course description'],
        networking_basics: ['Connected city infrastructure runs on networks.', 'Estimated from the course description']
      }
    },
    spreadsheet_decision_making: {
      name: 'Basic Decision Making with Spreadsheet', short: 'Spreadsheet Decisions', type: 'open', dept: 'Data Science',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'Using spreadsheets and macros to build clear reports for professional communication.',
      why: {}
    },
    scada: {
      name: 'Supervisory Control and Data Acquisition', short: 'Supervisory Control', type: 'open', dept: 'Mechatronics',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'Supervising industrial machines over communication protocols, using industry software.',
      why: {
        networking_basics: ['Machines exchange instructions and reports over communication protocols.', 'Estimated from the course description'],
        programming_basics: ['Supervisory software is configured and scripted.', 'Estimated from the course description']
      }
    },
    sustainable_energy_technologies: {
      name: 'Sustainable Energy Technologies', short: 'Sustainable Energy', type: 'open', dept: 'Basic Sciences',
      credits: 3, hours: '3 lecture hours a week',
      desc: 'Solar, wind, biomass and green hydrogen, plus energy efficiency and energy audits.',
      why: { energy_power_basics: ['Energy audits and efficiency need energy and power basics.', 'Estimated from the course description'] }
    },
    wireless_communications: {
      name: 'Wireless Communications for Everybody', short: 'Wireless Communications', type: 'open', dept: 'Electronics and Telecommunication',
      credits: 3, hours: '2 lecture + 2 practical hours a week',
      desc: 'How cellular systems work, explained for students outside electronics.',
      why: { networking_basics: ['Helps with how data travels across a network.', 'Estimated from the course description'] }
    }
  }
};
