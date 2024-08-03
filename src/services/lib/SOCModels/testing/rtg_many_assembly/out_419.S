.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , 7 
		addi    x26 , x0 , -2048 
		slti    x28 , x17 , 115 
		bltu    x17 , x26 , Less_i 
		bgeu    x17 , x26 , Bigger_i 
Less_i:
		ori     x1 , x17 , 68 
		sub     x5 , x26 , x17 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x14 , x0 , 0 
		beq     x5 , x14 , Pass 
Bigger_i:
		ori     x1 , x17 , 170 
		sub     x5 , x26 , x17 
		srai    x5 , x5 , 0 
		and     x5 , x5 , x0 
		addi    x14 , x0 , 0 
		beq     x5 , x14 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
