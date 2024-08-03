.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 57 
		addi    x29 , x0 , -2048 
		slti    x12 , x16 , 201 
		bltu    x16 , x29 , Less_i 
		bgeu    x16 , x29 , Bigger_i 
Less_i:
		ori     x14 , x16 , 24 
		sub     x28 , x29 , x16 
		srai    x28 , x28 , 2 
		and     x28 , x28 , x0 
		addi    x31 , x0 , 0 
		beq     x28 , x31 , Pass 
Bigger_i:
		ori     x14 , x16 , 166 
		sub     x28 , x29 , x16 
		srai    x28 , x28 , 1 
		and     x28 , x28 , x0 
		addi    x31 , x0 , 0 
		beq     x28 , x31 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
