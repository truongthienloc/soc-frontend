.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 172 
		addi    x31 , x0 , 152 
		addi    x6 , x0 , 1 
		bltu    x29 , x31 , Less_i 
		bgeu    x29 , x31 , Bigger_i 
Less_i:
		addi    x16 , x6 , 97 
		andi    x30 , x6 , 171 
		add     x30 , x30 , x16 
		srli    x30 , x30 , 1 
		addi    x12 , x0 , 49 
		bne     x30 , x12 , Fail 
Bigger_i:
		ori     x16 , x6 , 177 
		xori    x30 , x6 , 115 
		add     x30 , x30 , x16 
		srai    x30 , x30 , 2 
		addi    x12 , x0 , 72 
		bne     x30 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
