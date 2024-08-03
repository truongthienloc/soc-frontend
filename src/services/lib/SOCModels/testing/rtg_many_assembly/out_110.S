.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 140 
		addi    x8 , x0 , 159 
		sltiu   x18 , x19 , 159 
		bltu    x19 , x8 , Less_i 
		bgeu    x19 , x8 , Bigger_i 
Less_i:
		ori     x12 , x19 , 45 
		sub     x23 , x8 , x19 
		srai    x23 , x23 , 3 
		and     x23 , x23 , x0 
		addi    x13 , x0 , 0 
		beq     x23 , x13 , Pass 
Bigger_i:
		ori     x12 , x19 , 184 
		sub     x23 , x8 , x19 
		srai    x23 , x23 , 4 
		and     x23 , x23 , x0 
		addi    x13 , x0 , 0 
		beq     x23 , x13 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
