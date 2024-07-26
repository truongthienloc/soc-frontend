.text

#The program checks the ALU instruction in I_type

Main:
		addi    x30 , x0 , 46 
		addi    x17 , x0 , -2048 
		slti    x18 , x30 , 458 
		bltu    x30 , x17 , Less_i 
		bgeu    x30 , x17 , Bigger_i 
Less_i:
		ori     x13 , x30 , 159 
		sub     x11 , x17 , x30 
		srai    x11 , x11 , 0 
		and     x11 , x11 , x0 
		addi    x19 , x0 , 0 
		beq     x11 , x19 , Pass 
Bigger_i:
		ori     x13 , x30 , 160 
		sub     x11 , x17 , x30 
		srai    x11 , x11 , 4 
		and     x11 , x11 , x0 
		addi    x19 , x0 , 0 
		beq     x11 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
