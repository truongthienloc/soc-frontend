.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 158 
		addi    x24 , x0 , 157 
		sltu    x8 , x28 , x24 
		bltu    x28 , x24 , Less_i 
		bgeu    x28 , x24 , Bigger_i 
Less_i:
		ori     x12 , x28 , 96 
		sub     x2 , x24 , x28 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x13 , x0 , 0 
		beq     x2 , x13 , Pass 
Bigger_i:
		ori     x12 , x28 , 79 
		sub     x2 , x24 , x28 
		srai    x2 , x2 , 0 
		and     x2 , x2 , x0 
		addi    x13 , x0 , 0 
		beq     x2 , x13 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
