.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 6 
		addi    x8 , x0 , -2048 
		slti    x31 , x24 , 140 
		bltu    x24 , x8 , Less_i 
		bgeu    x24 , x8 , Bigger_i 
Less_i:
		ori     x3 , x24 , 42 
		sub     x23 , x8 , x24 
		srai    x23 , x23 , 4 
		and     x23 , x23 , x0 
		addi    x1 , x0 , 0 
		beq     x23 , x1 , Pass 
Bigger_i:
		ori     x3 , x24 , 87 
		sub     x23 , x8 , x24 
		srai    x23 , x23 , 1 
		and     x23 , x23 , x0 
		addi    x1 , x0 , 0 
		beq     x23 , x1 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
