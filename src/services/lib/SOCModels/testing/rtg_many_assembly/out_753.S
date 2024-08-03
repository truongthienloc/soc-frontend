.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , 199 
		addi    x3 , x0 , -2048 
		slti    x11 , x5 , 793 
		bltu    x5 , x3 , Less_i 
		bgeu    x5 , x3 , Bigger_i 
Less_i:
		ori     x26 , x5 , 178 
		sub     x14 , x3 , x5 
		srai    x14 , x14 , 4 
		and     x14 , x14 , x0 
		addi    x19 , x0 , 0 
		beq     x14 , x19 , Pass 
Bigger_i:
		ori     x26 , x5 , 14 
		sub     x14 , x3 , x5 
		srai    x14 , x14 , 2 
		and     x14 , x14 , x0 
		addi    x19 , x0 , 0 
		beq     x14 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
