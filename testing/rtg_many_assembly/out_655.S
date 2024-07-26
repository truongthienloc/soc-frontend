.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 79 
		addi    x13 , x0 , 157 
		sltiu   x31 , x19 , 157 
		bltu    x19 , x13 , Less_i 
		bgeu    x19 , x13 , Bigger_i 
Less_i:
		ori     x15 , x19 , 180 
		sub     x6 , x13 , x19 
		srai    x6 , x6 , 3 
		and     x6 , x6 , x0 
		addi    x5 , x0 , 0 
		beq     x6 , x5 , Pass 
Bigger_i:
		ori     x15 , x19 , 31 
		sub     x6 , x13 , x19 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x5 , x0 , 0 
		beq     x6 , x5 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
