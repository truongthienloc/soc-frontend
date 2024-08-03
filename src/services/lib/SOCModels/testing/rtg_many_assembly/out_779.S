.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 21 
		addi    x8 , x0 , 182 
		sltiu   x27 , x22 , 182 
		bltu    x22 , x8 , Less_i 
		bgeu    x22 , x8 , Bigger_i 
Less_i:
		ori     x2 , x22 , 112 
		sub     x26 , x8 , x22 
		srai    x26 , x26 , 2 
		and     x26 , x26 , x0 
		addi    x6 , x0 , 0 
		beq     x26 , x6 , Pass 
Bigger_i:
		ori     x2 , x22 , 85 
		sub     x26 , x8 , x22 
		srai    x26 , x26 , 2 
		and     x26 , x26 , x0 
		addi    x6 , x0 , 0 
		beq     x26 , x6 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
