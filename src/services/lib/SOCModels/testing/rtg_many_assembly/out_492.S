.text

#The program checks the ALU instruction in I_type

Main:
		addi    x30 , x0 , 39 
		addi    x9 , x0 , -2048 
		slti    x31 , x30 , 50 
		bltu    x30 , x9 , Less_i 
		bgeu    x30 , x9 , Bigger_i 
Less_i:
		ori     x3 , x30 , 66 
		sub     x20 , x9 , x30 
		srai    x20 , x20 , 4 
		and     x20 , x20 , x0 
		addi    x24 , x0 , 0 
		beq     x20 , x24 , Pass 
Bigger_i:
		ori     x3 , x30 , 1 
		sub     x20 , x9 , x30 
		srai    x20 , x20 , 1 
		and     x20 , x20 , x0 
		addi    x24 , x0 , 0 
		beq     x20 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
