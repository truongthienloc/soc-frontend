.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 14 
		addi    x8 , x0 , -2048 
		slti    x13 , x3 , 248 
		bltu    x3 , x8 , Less_i 
		bgeu    x3 , x8 , Bigger_i 
Less_i:
		ori     x19 , x3 , 145 
		sub     x24 , x8 , x3 
		srai    x24 , x24 , 0 
		and     x24 , x24 , x0 
		addi    x22 , x0 , 0 
		beq     x24 , x22 , Pass 
Bigger_i:
		ori     x19 , x3 , 121 
		sub     x24 , x8 , x3 
		srai    x24 , x24 , 1 
		and     x24 , x24 , x0 
		addi    x22 , x0 , 0 
		beq     x24 , x22 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
