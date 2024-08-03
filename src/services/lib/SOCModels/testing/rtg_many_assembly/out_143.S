.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 131 
		addi    x5 , x0 , 135 
		sltiu   x10 , x18 , 135 
		bltu    x18 , x5 , Less_i 
		bgeu    x18 , x5 , Bigger_i 
Less_i:
		ori     x8 , x18 , 154 
		sub     x22 , x5 , x18 
		srai    x22 , x22 , 2 
		and     x22 , x22 , x0 
		addi    x27 , x0 , 0 
		beq     x22 , x27 , Pass 
Bigger_i:
		ori     x8 , x18 , 35 
		sub     x22 , x5 , x18 
		srai    x22 , x22 , 2 
		and     x22 , x22 , x0 
		addi    x27 , x0 , 0 
		beq     x22 , x27 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
