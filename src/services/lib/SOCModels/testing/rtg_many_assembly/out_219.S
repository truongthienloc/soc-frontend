.text

#The program checks the ALU instruction in I_type

Main:
		addi    x14 , x0 , 73 
		addi    x19 , x0 , -2048 
		slti    x13 , x14 , 872 
		bltu    x14 , x19 , Less_i 
		bgeu    x14 , x19 , Bigger_i 
Less_i:
		ori     x11 , x14 , 16 
		sub     x28 , x19 , x14 
		srai    x28 , x28 , 4 
		and     x28 , x28 , x0 
		addi    x17 , x0 , 0 
		beq     x28 , x17 , Pass 
Bigger_i:
		ori     x11 , x14 , 78 
		sub     x28 , x19 , x14 
		srai    x28 , x28 , 0 
		and     x28 , x28 , x0 
		addi    x17 , x0 , 0 
		beq     x28 , x17 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
