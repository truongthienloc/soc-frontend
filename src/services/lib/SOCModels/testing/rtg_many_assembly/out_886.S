.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 118 
		addi    x13 , x0 , 76 
		sltiu   x18 , x31 , 76 
		bltu    x31 , x13 , Less_i 
		bgeu    x31 , x13 , Bigger_i 
Less_i:
		ori     x22 , x31 , 60 
		sub     x7 , x13 , x31 
		srai    x7 , x7 , 2 
		and     x7 , x7 , x0 
		addi    x25 , x0 , 0 
		beq     x7 , x25 , Pass 
Bigger_i:
		ori     x22 , x31 , 62 
		sub     x7 , x13 , x31 
		srai    x7 , x7 , 4 
		and     x7 , x7 , x0 
		addi    x25 , x0 , 0 
		beq     x7 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
