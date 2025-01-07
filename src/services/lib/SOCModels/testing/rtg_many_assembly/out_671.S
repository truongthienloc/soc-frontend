.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 185 
		addi    x9 , x0 , 48 
		sltiu   x17 , x25 , 48 
		bltu    x25 , x9 , Less_i 
		bgeu    x25 , x9 , Bigger_i 
Less_i:
		ori     x6 , x25 , 186 
		sub     x7 , x9 , x25 
		srai    x7 , x7 , 1 
		and     x7 , x7 , x0 
		addi    x18 , x0 , 0 
		beq     x7 , x18 , Pass 
Bigger_i:
		ori     x6 , x25 , 24 
		sub     x7 , x9 , x25 
		srai    x7 , x7 , 4 
		and     x7 , x7 , x0 
		addi    x18 , x0 , 0 
		beq     x7 , x18 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
