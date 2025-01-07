.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 188 
		addi    x5 , x0 , 199 
		sltiu   x22 , x19 , 199 
		bltu    x19 , x5 , Less_i 
		bgeu    x19 , x5 , Bigger_i 
Less_i:
		ori     x21 , x19 , 124 
		sub     x6 , x5 , x19 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x1 , x0 , 0 
		beq     x6 , x1 , Pass 
Bigger_i:
		ori     x21 , x19 , 2 
		sub     x6 , x5 , x19 
		srai    x6 , x6 , 2 
		and     x6 , x6 , x0 
		addi    x1 , x0 , 0 
		beq     x6 , x1 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
