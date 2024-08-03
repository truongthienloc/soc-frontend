.text

#The program finds the value of fibonacci 

Fibo:
		addi    x7 , x0 , 4 
		addi    x28 , x0 , 1 
		addi    x16 , x0 , 1 
		addi    x23 , x0 , 3 
		beq     x7 , x0 , Result0 
		beq     x7 , x16 , Result1 
Loop: 
		blt     x7 , x23 , Result 
		add     x6 , x28 , x16 
		addi    x28 , x16 , 0 
		addi    x16 , x6 , 0 
		addi    x23 , x23 , 1 
		jal     x0 , Loop 
Result0:
		addi    x6 , x0 , 0 
		addi    x21 , x0 , 0 
		bne     x6 , x21 , Fail 
Result1:
		addi    x6 , x0 , 1 
		addi    x30 , x0 , 1 
		bne     x6 , x30 , Fail 
Result:
		addi    x29 , x0 , 3 
		bne     x6 , x29 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
