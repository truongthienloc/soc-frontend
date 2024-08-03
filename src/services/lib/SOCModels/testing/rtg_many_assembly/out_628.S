.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , 73 
		addi    x21 , x0 , -2048 
		slti    x17 , x23 , 515 
		bltu    x23 , x21 , Less_i 
		bgeu    x23 , x21 , Bigger_i 
Less_i:
		ori     x28 , x23 , 53 
		sub     x13 , x21 , x23 
		srai    x13 , x13 , 2 
		and     x13 , x13 , x0 
		addi    x12 , x0 , 0 
		beq     x13 , x12 , Pass 
Bigger_i:
		ori     x28 , x23 , 60 
		sub     x13 , x21 , x23 
		srai    x13 , x13 , 4 
		and     x13 , x13 , x0 
		addi    x12 , x0 , 0 
		beq     x13 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
