.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 152 
		addi    x24 , x0 , -2048 
		slti    x10 , x31 , 534 
		bltu    x31 , x24 , Less_i 
		bgeu    x31 , x24 , Bigger_i 
Less_i:
		ori     x25 , x31 , 177 
		sub     x2 , x24 , x31 
		srai    x2 , x2 , 4 
		and     x2 , x2 , x0 
		addi    x13 , x0 , 0 
		beq     x2 , x13 , Pass 
Bigger_i:
		ori     x25 , x31 , 73 
		sub     x2 , x24 , x31 
		srai    x2 , x2 , 1 
		and     x2 , x2 , x0 
		addi    x13 , x0 , 0 
		beq     x2 , x13 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
