.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 173 
		addi    x7 , x0 , 93 
		sltiu   x30 , x15 , 93 
		bltu    x15 , x7 , Less_i 
		bgeu    x15 , x7 , Bigger_i 
Less_i:
		ori     x14 , x15 , 118 
		sub     x17 , x7 , x15 
		srai    x17 , x17 , 4 
		and     x17 , x17 , x0 
		addi    x20 , x0 , 0 
		beq     x17 , x20 , Pass 
Bigger_i:
		ori     x14 , x15 , 187 
		sub     x17 , x7 , x15 
		srai    x17 , x17 , 3 
		and     x17 , x17 , x0 
		addi    x20 , x0 , 0 
		beq     x17 , x20 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
