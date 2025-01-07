.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 40 
		addi    x18 , x0 , 195 
		addi    x24 , x0 , 85 
		bltu    x15 , x18 , Less_i 
		bgeu    x15 , x18 , Bigger_i 
Less_i:
		addi    x3 , x24 , 107 
		andi    x4 , x24 , 187 
		add     x4 , x4 , x3 
		srli    x4 , x4 , 0 
		addi    x12 , x0 , 209 
		bne     x4 , x12 , Fail 
Bigger_i:
		ori     x3 , x24 , 111 
		xori    x4 , x24 , 141 
		add     x4 , x4 , x3 
		srai    x4 , x4 , 1 
		addi    x12 , x0 , 171 
		bne     x4 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
