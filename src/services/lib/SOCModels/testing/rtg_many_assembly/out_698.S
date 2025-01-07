.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 165 
		addi    x2 , x0 , 167 
		addi    x31 , x0 , 11 
		bltu    x21 , x2 , Less_i 
		bgeu    x21 , x2 , Bigger_i 
Less_i:
		addi    x9 , x31 , 135 
		andi    x4 , x31 , 111 
		add     x4 , x4 , x9 
		srli    x4 , x4 , 2 
		addi    x8 , x0 , 39 
		bne     x4 , x8 , Fail 
Bigger_i:
		ori     x9 , x31 , 122 
		xori    x4 , x31 , 100 
		add     x4 , x4 , x9 
		srai    x4 , x4 , 1 
		addi    x8 , x0 , 117 
		bne     x4 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
