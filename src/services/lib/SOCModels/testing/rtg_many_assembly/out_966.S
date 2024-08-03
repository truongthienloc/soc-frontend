.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 74 
		addi    x8 , x0 , 147 
		sltiu   x15 , x26 , 147 
		bltu    x26 , x8 , Less_i 
		bgeu    x26 , x8 , Bigger_i 
Less_i:
		ori     x27 , x26 , 43 
		sub     x16 , x8 , x26 
		srai    x16 , x16 , 1 
		and     x16 , x16 , x0 
		addi    x3 , x0 , 0 
		beq     x16 , x3 , Pass 
Bigger_i:
		ori     x27 , x26 , 144 
		sub     x16 , x8 , x26 
		srai    x16 , x16 , 0 
		and     x16 , x16 , x0 
		addi    x3 , x0 , 0 
		beq     x16 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
